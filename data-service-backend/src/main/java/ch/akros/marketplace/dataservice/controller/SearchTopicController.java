
package ch.akros.marketplace.dataservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import ch.akros.marketplace.api.SearchTopicApi;
import ch.akros.marketplace.api.model.TopicSearchListResponseDTO;
import ch.akros.marketplace.api.model.TopicSearchRequestDTO;
import ch.akros.marketplace.dataservice.service.TopicService;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class SearchTopicController implements SearchTopicApi {
  @Autowired
  private TopicService topicService;

  @Override
  public ResponseEntity<TopicSearchListResponseDTO> searchTopicPost(TopicSearchRequestDTO topicSearchRequestDTO) {
    try {
      log.debug("SaveTopicController.saveTopicPost() called");

      TopicSearchListResponseDTO topicSearchListResponseDTO = topicService.searchTopic(topicSearchRequestDTO);
      return ResponseEntity.status(HttpStatus.OK).body(null);
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }
}
