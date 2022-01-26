
package ch.akros.marketplace.dataservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import ch.akros.marketplace.api.DeleteTopicApi;
import ch.akros.marketplace.dataservice.service.TopicService;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class DeleteTopicController implements DeleteTopicApi {
  @Autowired
  private TopicService topicService;

  @Override
  public ResponseEntity<Void> deleteTopicTopicIdDelete(Long topicId) {
    try {
      log.debug("DeleteTopicController.deleteTopicTopicIdGet() called");

      topicService.deleteTopic(topicId);
      return ResponseEntity.status(HttpStatus.OK).build();
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
