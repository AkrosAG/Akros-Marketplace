package ch.akros.marketplace.service.controller;

import ch.akros.marketplace.api.TopicsApi;
import ch.akros.marketplace.api.model.*;
import ch.akros.marketplace.service.service.TopicService;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.annotation.Timed;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@Slf4j
public class TopicController implements TopicsApi {
    private final TopicService topicService;

    // micrometer metric
    private final Counter counterForLoadTopic;

    @Autowired
    public TopicController(MeterRegistry registry, TopicService topicService) {
        this.topicService = topicService;
        this.counterForLoadTopic = registry.counter("counter_for_load_topic");
    }

    @Override
    public ResponseEntity<TopicLoadResponseDTO> topicsTopicIdGet(Long topicId) {
        try {
            log.debug("TopicController.TopicTopicIdGet() called");
            TopicLoadResponseDTO topic = topicService.loadTopic(topicId);
            counterForLoadTopic.increment();
            return ResponseEntity.status(HttpStatus.OK).body(topic);
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(value = "/topics/user/{userId}")
    public ResponseEntity<List<TopicLoadResponseDTO>> getTopicsForUser(@PathVariable("userId") String userId) {
        try {
            log.debug("TopicController.getAllTopicsFromUser() called");
            List<TopicLoadResponseDTO> topics = topicService.loadTopicsForUser(userId);
            return ResponseEntity.status(HttpStatus.OK).body(topics);
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // @Timed annotation metric records the execution time of the create method,
    // from the start and until it exits normally or exceptionally.
    @Timed(value = "create.topic.time", description = "Time taken to return topic")
    @PostMapping(value = "/topics", consumes = { "multipart/form-data" })
    public ResponseEntity<Void> createTopic(@RequestPart("topics") String topicSaveRequestDTO,
                                            @RequestPart(value = "thumbnail", required = false) MultipartFile thumbnail,
                                            @RequestPart(value = "images", required = false) MultipartFile[] images) {
        try {
            log.debug("TopicController.topicsPost() called");
            topicService.saveTopic(topicSaveRequestDTO, images, thumbnail);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @Override
    public ResponseEntity<Void> topicsTopicIdDelete(Long topicId) {
        try {
            log.debug("TopicController.topicsDelete() called");
            topicService.deleteTopic(topicId);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception ex) {
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
    } catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @Override
  public ResponseEntity<TopicSearchListResponseDTO> topicsSearchesGet() {
    try {
      log.debug("TopicController.topicsSearchesGet() called");
      TopicSearchListResponseDTO topics = topicService.findAllTopics();
      return ResponseEntity.status(HttpStatus.OK).body(topics);
    } catch(Exception e) {
      log.error(e.getMessage(), e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
