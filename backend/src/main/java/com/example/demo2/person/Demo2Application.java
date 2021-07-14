package com.example.demo2.person;

import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.objdetect.CascadeClassifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@EnableAutoConfiguration(exclude={PersonController.class})
public class Demo2Application {


    public static void main(String[] args) {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        SpringApplication.run(Demo2Application.class, args);


//        String imgFile = "uploads/_received7.jpg";
//        Mat src = Imgcodecs.imread(imgFile);
//
//        String xmlFile = "xml/lbpcascade_frontalface.xml";
//        CascadeClassifier cc = new CascadeClassifier(xmlFile);
//
//        MatOfRect faceDetection = new MatOfRect();
//        cc.detectMultiScale(src, faceDetection);
//        System.out.println(String.format("Detected faces: %d", faceDetection.toArray().length));
//
//        for (Rect rect : faceDetection.toArray()) {
//            Imgproc.rectangle(src, new Point(rect.x, rect.y), new Point(rect.x + rect.width, rect.y + rect.height), new Scalar(0, 0, 255), 3);
//        }
//        // check if there is only one face or if it there are no faces
//        //   if(faceDetection.toArray().length != 1){
//        System.out.println("Take another picture");
//        //   }else{
//        Imgcodecs.imwrite("uploads/bruh_out.jpg", src);
//        System.out.println("Image Detection Finished");

        //   }

    }
}
