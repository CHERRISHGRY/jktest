package com.oxchains.themis.message;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * @author luoxuri
 * @create 2017-10-20 19:06
 **/
@SpringBootApplication
@EnableScheduling
@EnableAutoConfiguration
@EnableEurekaClient
public class MessageApplication {
    public static void main(String[] args){
        SpringApplication.run(MessageApplication.class, args);
    }
}