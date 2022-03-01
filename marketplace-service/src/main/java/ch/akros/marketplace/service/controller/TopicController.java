package ch.akros.marketplace.service.controller;

import ch.akros.marketplace.api.TopicsApi;
import ch.akros.marketplace.api.model.TopicLoadResponseDTO;
import ch.akros.marketplace.api.model.TopicSaveRequestDTO;
import ch.akros.marketplace.api.model.TopicSearchListResponseDTO;
import ch.akros.marketplace.api.model.TopicSearchRequestDTO;
import ch.akros.marketplace.service.service.TopicService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class TopicController implements TopicsApi {
    @Autowired
    private TopicService topicService;

    @Override
    public ResponseEntity<TopicLoadResponseDTO> topicsTopicIdGet(Long topicId) {
        try {
            log.debug("TopicController.TopicTopicIdGet() called");
            TopicLoadResponseDTO topic = topicService.loadTopic(topicId);
            return ResponseEntity.status(HttpStatus.OK).body(topic);
        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public ResponseEntity<Void> topicsPost(TopicSaveRequestDTO topicSaveRequestDTO) {
        try {
            log.debug("TopicController.topicsPost() called");
            topicService.saveTopic(topicSaveRequestDTO);
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public ResponseEntity<Void> topicsDelete(Long topicId) {
        try {
            log.debug("TopicController.topicsDelete() called");
            topicService.deleteTopic(topicId);
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public ResponseEntity<TopicSearchListResponseDTO> topicsSearchesPost(TopicSearchRequestDTO topicSearchRequestDTO) {
        try {
            log.debug("TopicController.topicsSearchPost() called");
            TopicSearchListResponseDTO topicSearchListResponseDTO = topicService.searchTopic(topicSearchRequestDTO);
            return ResponseEntity.status(HttpStatus.OK).body(topicSearchListResponseDTO);
        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
