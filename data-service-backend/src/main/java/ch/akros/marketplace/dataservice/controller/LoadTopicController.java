
package ch.akros.marketplace.dataservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import ch.akros.marketplace.api.LoadTopicApi;
import ch.akros.marketplace.api.model.TopicLoadResponseDTO;
import ch.akros.marketplace.dataservice.service.TopicService;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class LoadTopicController implements LoadTopicApi {
  @Autowired
  private TopicService topicService;

  @Override
  public ResponseEntity<TopicLoadResponseDTO> loadTopicTopicIdGet(Long topicId) {
    try {
      log.debug("LoadTopicController.loadTopicTopicIdGet() called");

      TopicLoadResponseDTO topic = topicService.loadTopic(topicId);
      return ResponseEntity.status(HttpStatus.OK).body(topic);
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
