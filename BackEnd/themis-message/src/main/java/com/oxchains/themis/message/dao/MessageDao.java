package com.oxchains.themis.message.dao;

import com.oxchains.themis.message.domain.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author luoxuri
 * @create 2017-11-06 14:59
 **/
@Repository
public interface MessageDao extends CrudRepository<Message, Long> {

    Page<Message> findByReceiverIdAndMessageType(Long receiverId, Integer messageType, Pageable pageable);

    Page<Message> findByReceiverIdAndMessageTypeOrReceiverId(Long receiverId, Integer messageType, Long receiverId2,Pageable pageable);

    List<Message> findByReceiverIdAndReadStatus(Long receiverId, Integer readStatus);
    List<Message> findByReceiverIdAndReadStatusAndMessageType(Long receiverId, Integer readStatus, Integer messageType);
    List<Message> findByMessageTextIdAndReceiverId(Long messageTextId, Long receiverId);
}