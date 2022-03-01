
package ch.akros.marketplace.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import ch.akros.marketplace.service.MarketplaceServiceApplication;
import ch.akros.marketplace.service.repository.AdvertiserRepository;
import ch.akros.marketplace.service.repository.CategoryRepository;
import ch.akros.marketplace.service.repository.FieldRepository;
import ch.akros.marketplace.service.repository.TopicRepository;

@SpringBootTest
@ContextConfiguration(classes = MarketplaceServiceApplication.class)
@Transactional
public class AddTopicsTest {
	private final static int ADD_COUNT_OFFERS = 100;
	private final static int ADD_COUNT_SEARCH_REQUESTS = 100;

	@Autowired
	private FieldRepository fieldRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private AdvertiserRepository advertiserRepository;

	@Autowired
	private TopicRepository topicRepository;
//
//	@Test
//	@Rollback(false)
//	public void addOfferTopicsTest() {
//		Category category = categoryRepository.findAll().stream().filter(e -> e.getFields().size() > 0).findFirst()
//				.orElse(null);
//
//		Advertiser advertiser = advertiserRepository.findAll().stream().findFirst().orElse(null);
//
//		List<FieldType> offerFieldTypes = fieldTypeRepository.listTopicSearchFieldTypes(category.getCategoryId(),
//				false);
//
//		for (int i = 0; i < ADD_COUNT_OFFERS; i++) {
//			addTopic(category, advertiser, offerFieldTypes, true);
//		}
//	}
//
//	@Test
//	@Rollback(false)
//	public void addSearchRequestTopicsTest() {
//		Category category = categoryRepository.findAll().stream().filter(e -> e.getFields().size() > 0).findFirst()
//				.orElse(null);
//
//		Advertiser advertiser = advertiserRepository.findAll().stream().findFirst().orElse(null);
//
//		List<FieldType> offerFieldTypes = fieldTypeRepository.listTopicSearchFieldTypes(category.getCategoryId(), true);
//
//		for (int i = 0; i < ADD_COUNT_SEARCH_REQUESTS; i++) {
//			addTopic(category, advertiser, offerFieldTypes, false);
//		}
//	}
//
//	private void addTopic(Category category, Advertiser advertiser, List<FieldType> fieldTypes, boolean requestOrOffer) {
//		Topic topic = new Topic();
//		topic.setAdvertiser(advertiser);
//		topic.setCategory(category);
//		topic.setValidFrom(LocalDate.now());
//		topic.setValidTo(LocalDate.now().plusMonths(1));
//		topic.setRequestOrOffer(requestOrOffer);
//
//		List<TopicValue> topicValues = new ArrayList<>();
//		topic.setTopicValues(topicValues);
//		for (FieldType fieldType : fieldTypes) {
//			TopicValue topicValue = new TopicValue();
//			topicValue.setCategory(category);
//			topicValue.setFieldType(fieldType);
//			topicValue.setTopic(topic);
//
//			switch (EFieldTypeDefinition.values()[fieldType.getFieldTypeDefinition().getFieldTypeDefinitionId()]) {
//			case BOOLEAN: {
//				topicValue.setValue(String.valueOf(ThreadLocalRandom.current().nextBoolean()));
//				break;
//			}
//
//			case CHOOSE_MULTI_OPTION:
//			case CHOOSE_SINGLE_OPTION:
//			case NUMBER:
//			case PRICE: {
//				topicValue.setValue(Double.valueOf(ThreadLocalRandom.current().nextInt(
//						fieldType.getMinValue() != null ? fieldType.getMinValue() : 0,
//						fieldType.getMaxValue() != null ? fieldType.getMaxValue() + 1 : Integer.MAX_VALUE)).toString());
//				break;
//			}
//
//			case DATE: {
//				topicValue.setValue(LocalDate.now().plusDays(ThreadLocalRandom.current().nextInt(1, 365)).toString());
//				break;
//			}
//
//			case EMAIL: {
//				topicValue.setValue(
//						String.format("%s@%s.%s", randomWord(10, 20), randomWord(5, 10), randomWord(3)).toString());
//
//				break;
//			}
//
//			case PHONE_NUMBER: {
//				topicValue.setValue(String.valueOf(ThreadLocalRandom.current().nextLong(10000000L, 100000000L)));
//				break;
//			}
//
//			case PICTURE: {
//				break;
//			}
//
//			case TEXT_MULTI_LINE: {
//				topicValue.setValue(randomText(7, 23));
//				break;
//			}
//
//			case TEXT_SINGLE_LINE: {
//				topicValue.setValue(randomText(2, 5));
//				break;
//			}
//
//			default:
//				break;
//			}
//
//			topicValues.add(topicValue);
//		}
//
//		topicRepository.save(topic);
//	}
//
//	private String randomText(int minWords, int maxWords) {
//		int words = ThreadLocalRandom.current().nextInt(minWords, maxWords + 1);
//
//		StringBuilder sb = new StringBuilder();
//		for (int i = 0; i < words; i++) {
//			if (sb.length() != 0) {
//				sb.append(" ");
//			}
//
//			sb.append(randomWord(3, 18));
//		}
//
//		return sb.toString();
//	}
//
//	private String randomWord(int length) {
//		return randomWord(length, length);
//	}
//
//	private String randomWord(int minLength, int maxLength) {
//		int length = minLength != maxLength ? ThreadLocalRandom.current().nextInt(minLength, maxLength + 1) : minLength;
//		StringBuilder sb = new StringBuilder();
//
//		while (sb.length() < length) {
//			Character c = (char) ThreadLocalRandom.current().nextInt(0, 256);
//
//			if ((c >= '0' && c <= '9') || (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
//				sb.append(c);
//			}
//		}
//
//		return sb.toString();
//	}
}