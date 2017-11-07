package com.oxchains.themis.chat.websocket;

import com.oxchains.themis.chat.auth.JwtService;
import com.oxchains.themis.chat.service.KafkaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Service;
import com.oxchains.themis.chat.websocket.WebSocketServer;

import javax.annotation.Resource;

/**
 * create by huohuo
 * @author huohuo
 */
@Service
public class StartupListener implements ApplicationListener<ContextRefreshedEvent> {
    @Value("${websocket.port}")
    private Integer port;
    @Resource
    private KafkaService kafkaService;
    public StartupListener(){

    }
    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        new Thread(new WebSocketServer(kafkaService,port)).start();
    }
}