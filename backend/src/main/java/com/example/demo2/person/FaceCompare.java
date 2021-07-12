package com.example.demo2.person;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.objdetect.CascadeClassifier;
import java.util.Arrays;

@SpringBootApplication
public class FaceCompare {

    public static void main(String[] args) {

        SpringApplication.run(FaceCompare.class, args);

        String basePicPath = "uploads\\";
        double compareHist = compare_image(basePicPath + "ivan_proba2.png", basePicPath + "ivan_proba.png");
        System.out.println(compareHist);
        if (compareHist > 0.72) {
            System.out.println("face matching");
        } else {
            System.out.println("Face does not match");
        }
    }

    // Initialize the face detector
    static CascadeClassifier faceDetector;

    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        faceDetector = new CascadeClassifier("xml/haarcascade_frontalface_alt.xml");
    }
    // returns grayscale face Mat
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

    public static double compare_image(String img_1, String img_2) {
        Mat face_1 = conv_Mat(img_1);
        Mat face_2 = conv_Mat(img_2);
        Mat hist_1 = new Mat();
        Mat hist_2 = new Mat();

        //Color range
        MatOfFloat ranges = new MatOfFloat(0f, 256f);
        //Histogram size, the bigger the match, the more accurate (slower)
        MatOfInt histSize = new MatOfInt(1000);

        // transforms the face into histogram
        Imgproc.calcHist(Arrays.asList(face_1), new MatOfInt(0), new Mat(), hist_1, histSize, ranges);
        Imgproc.calcHist(Arrays.asList(face_2), new MatOfInt(0), new Mat(), hist_2, histSize, ranges);

        // CORREL correlation coefficient
        double res = Imgproc.compareHist(hist_1, hist_2, Imgproc.CV_COMP_CORREL);
        return res;
    }

}