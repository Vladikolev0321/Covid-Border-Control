package com.example.demo2.person;

import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.objdetect.CascadeClassifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Component
public class PersonService {

    @Autowired
    private PersonRepository repo;

    public Person save(Person person){
        return repo.save(person);
    }

    public List<Person> getAll() {
        return repo.findAll();
    }

    public Person getPersonByID(Long id){
        return repo.findById(id).orElse(null);
    }

    public Person updatePerson(Long id, Map<String, String> args){

        Person person = this.getPersonByID(id);

        if(person != null){
            person.setFirstName(args.get("firstName"));
            person.setLastName(args.get("lastName"));
            person.setBirthdate(LocalDate.parse(args.get("birthdate"), DateTimeFormatter.ofPattern("yyyy-MM-dd")));
            person.setHealthStatus(HealthStatus.valueOf(args.get("healthStatus")));
            return this.save(person);
        }

        return null;
    }
    private static CascadeClassifier faceDetector;
    private static int counter = 0;

    static {
     //   System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        faceDetector = new CascadeClassifier("xml/haarcascade_frontalface_alt.xml");
    }

    public static int getCounter() {
        return ++counter;
    }

    // grayscale face and return only the face part of the image as a Mat object
    public static Mat conv_Mat(String img) {
        Mat image0 = Imgcodecs.imread(img);

        Mat image1 = new Mat();
        // Grayscale
        Imgproc.cvtColor(image0, image1, Imgproc.COLOR_BGR2GRAY);
        // Detecting faces
        MatOfRect faceDetections = new MatOfRect();
        faceDetector.detectMultiScale(image1, faceDetections);
        // range of face images in rect
        for (Rect rect : faceDetections.toArray()) {
            Mat face = new Mat(image1, rect);
            return face;
        }
        return null;
    }
    // compare 2 images
    public static double compare_image(String img_1, String img_2) {
        Mat face_1 = conv_Mat(img_1);
        Mat face_2 = conv_Mat(img_2);
        Mat hist_1 = new Mat();
        Mat hist_2 = new Mat();

        //Color range
        MatOfFloat ranges = new MatOfFloat(0f, 256f);
        //Histogram size, the bigger the match, the more accurate (slower)
        MatOfInt histSize = new MatOfInt(1000);

        Imgproc.calcHist(Arrays.asList(face_1), new MatOfInt(0), new Mat(), hist_1, histSize, ranges);
        Imgproc.calcHist(Arrays.asList(face_2), new MatOfInt(0), new Mat(), hist_2, histSize, ranges);

        // CORREL correlation coefficient
        double res = Imgproc.compareHist(hist_1, hist_2, Imgproc.CV_COMP_CORREL);
        return res;
    }

    // list all files names for given directory
    public Set<String> listFilesUsingDirectoryStream(String dir, Path currImage) throws IOException {
        Set<String> fileList = new HashSet<>();
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(Paths.get(dir))) {
            for (Path path : stream) {
                if (!Files.isDirectory(path) && !path.getFileName().equals(currImage.getFileName())) {
                    fileList.add(path.getFileName()
                            .toString());
                }
            }
        }
        return fileList;
    }

    // search user with this image path
    public void searchPersonWithThisImagePath(String imageName){
        //System.out.println(imageName);
        Person personWithThisImagePath = repo.findByImagePath(".\\uploads\\" + imageName);
        System.out.println(personWithThisImagePath);
    }


    public void deletePerson(Long id){
        repo.delete(this.getPersonByID(id));
    }
}
