
package ch.akros.marketplace.repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import ch.akros.marketplace.dataservice.AkrosMarketplaceDataServiceApplication;
import ch.akros.marketplace.dataservice.constants.EFieldTypeDefinition;
import ch.akros.marketplace.dataservice.entity.Advertiser;
import ch.akros.marketplace.dataservice.entity.Category;
import ch.akros.marketplace.dataservice.entity.FieldType;
import ch.akros.marketplace.dataservice.entity.Topic;
import ch.akros.marketplace.dataservice.entity.TopicValue;
import ch.akros.marketplace.dataservice.repository.AdvertiserRepository;
import ch.akros.marketplace.dataservice.repository.CategoryRepository;
import ch.akros.marketplace.dataservice.repository.FieldTypeRepository;
import ch.akros.marketplace.dataservice.repository.TopicRepository;

@SpringBootTest
@ContextConfiguration(classes = AkrosMarketplaceDataServiceApplication.class)
@Transactional
public class AddTopicsTest {
  private final static int     ADD_COUNT_OFFERS          = 100;
  private final static int     ADD_COUNT_SEARCH_REQUESTS = 100;

  @Autowired
  private FieldTypeRepository  fieldTypeRepository;

  @Autowired
  private CategoryRepository   categoryRepository;

  @Autowired
  private AdvertiserRepository advertiserRepository;

  @Autowired
  private TopicRepository      topicRepository;

  @Test
  @Rollback(false)
  public void addOfferTopicsTest() {
    Category category = categoryRepository.findAll()
                                          .stream()
                                          .filter(e -> e.getFieldTypes().size() > 0)
                                          .findFirst()
                                          .orElse(null);

    Advertiser advertiser = advertiserRepository.findAll().stream().findFirst().orElse(null);

    List<FieldType> offerFieldTypes = fieldTypeRepository.listTopicSearchFieldTypes(category.getCategoryId(), false);

    for (int i = 0; i < ADD_COUNT_OFFERS; i++) {
      addTopic(category, advertiser, offerFieldTypes, "OFFER");
    }
  }

  @Test
  @Rollback(false)
  public void addSearchRequestTopicsTest() {
    Category category = categoryRepository.findAll()
                                          .stream()
                                          .filter(e -> e.getFieldTypes().size() > 0)
                                          .findFirst()
                                          .orElse(null);

    Advertiser advertiser = advertiserRepository.findAll().stream().findFirst().orElse(null);

    List<FieldType> offerFieldTypes = fieldTypeRepository.listTopicSearchFieldTypes(category.getCategoryId(), true);

    for (int i = 0; i < ADD_COUNT_SEARCH_REQUESTS; i++) {
      addTopic(category, advertiser, offerFieldTypes, "SEARCH");
    }
  }

  private void addTopic(Category category, Advertiser advertiser, List<FieldType> fieldTypes, String searchOrOffer) {
    Topic topic = new Topic();
    topic.setAdvertiser(advertiser);
    topic.setCategory(category);
    topic.setValidFrom(LocalDate.now());
    topic.setValidTo(LocalDate.now().plusMonths(1));
    topic.setSearchOrOffer(searchOrOffer);

    List<TopicValue> topicValues = new ArrayList<>();
    topic.setTopicValues(topicValues);
    for (FieldType fieldType : fieldTypes) {
      TopicValue topicValue = new TopicValue();
      topicValue.setCategory(category);
      topicValue.setFieldType(fieldType);
      topicValue.setTopic(topic);

      switch (EFieldTypeDefinition.values()[fieldType.getFieldTypeDefinition().getFieldTypeDefinitionId()]) {
        case BOOLEAN: {
          topicValue.setValueBoolean(ThreadLocalRandom.current().nextBoolean());
          break;
        }

        case CHOOSE_MULTI_OPTION: {
          topicValue.setValueNum(Double.valueOf(ThreadLocalRandom.current()
                                                                 .nextInt(fieldType.getMinValue(),
                                                                          fieldType.getMaxValue() + 1)));
          break;
        }

        case CHOOSE_SINGLE_OPTION: {
          topicValue.setValueNum(Double.valueOf(ThreadLocalRandom.current()
                                                                 .nextInt(fieldType.getMinValue(),
                                                                          fieldType.getMaxValue() + 1)));
          break;
        }

        case DATE: {
          topicValue.setValueDate(LocalDate.now().plusDays(ThreadLocalRandom.current().nextInt(1, 365)));
          break;
        }

        case EMAIL: {
          topicValue.setValueVarchar(String.format("%s@%s.%s", randomWord(10, 20), randomWord(5, 10), randomWord(3)));

          break;
        }

        case NUMBER: {
          topicValue.setValueNum(Double.valueOf(ThreadLocalRandom.current()
                                                                 .nextInt(fieldType.getMinValue(),
                                                                          fieldType.getMaxValue() + 1)));

          break;
        }

        case PHONE_NUMBER: {
          topicValue.setValueVarchar(String.valueOf(ThreadLocalRandom.current().nextLong(10000000L, 100000000L)));
          break;
        }

        case PICTURE: {
          break;
        }

        case PRICE: {
          topicValue.setValueNum(ThreadLocalRandom.current()
                                                  .nextDouble(fieldType.getMinValue(), fieldType.getMaxValue() + 1));
          break;
        }

        case TEXT_MULTI_LINE: {
          topicValue.setValueVarchar(randomText(7, 23));
          break;
        }

        case TEXT_SINGLE_LINE: {
          topicValue.setValueVarchar(randomText(2, 5));
          break;
        }

        default:
          break;
      }

      topicValues.add(topicValue);
    }

    topicRepository.save(topic);
  }

  private String randomText(int minWords, int maxWords) {
    int words = ThreadLocalRandom.current().nextInt(minWords, maxWords + 1);

    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < words; i++) {
      if (sb.length() != 0) {
        sb.append(" ");
      }

      sb.append(randomWord(3, 18));
    }

    return sb.toString();
  }

  private String randomWord(int length) {
    return randomWord(length, length);
  }

  private String randomWord(int minLength, int maxLength) {
    int length = minLength != maxLength ? ThreadLocalRandom.current().nextInt(minLength, maxLength + 1) : minLength;
    StringBuilder sb = new StringBuilder();

    while (sb.length() < length) {
      Character c = (char) ThreadLocalRandom.current().nextInt(0, 256);

      if ((c >= '0' && c <= '9') || (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
        sb.append(c);
      }
    }

    return sb.toString();
  }
}