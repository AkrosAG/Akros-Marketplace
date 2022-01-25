
package ch.akros.marketplace.dataservice.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Table(name = "FIELD_TYPE")
@Entity(name = "fieldType")
public class FieldType {
	@Id
	@Column(name = "FIELD_TYPE_ID", unique = true)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long fieldTypeId;

	@ManyToOne
	@ToString.Exclude
	@JoinColumn(referencedColumnName = "CATEGORY_ID", name = "CATEGORY_ID", foreignKey = @ForeignKey(name = "FIELD_TYPE_CATEGORY_FK"))
	private Category category;

	@Column(name = "DESCRIPTION")
	private String description;

	@Column(name = "SHORT_DESCRIPTION")
	private String shortDescription;

	@Column(name = "MIN_VALUE")
	private Integer minValue;

	@Column(name = "MAX_VALUE")
	private Integer maxValue;

	@Column(name = "SORT_NUMBER")
	private int sortNumber;

	@Column(name = "REQUIRED")
	private boolean required;

	@Column(name = "SEARCHABLE")
	private boolean searchable;

	@Column(name = "SEARCH")
	private boolean search;

	@Column(name = "OFFER")
	private boolean offer;

	@OneToMany(mappedBy = "fieldType", cascade = CascadeType.ALL)
	private List<FieldTypeChoose> fieldTypeChooses;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(referencedColumnName = "FIELD_TYPE_DEFINITION_ID", name = "FIELD_TYPE_DEFINITION_ID", foreignKey = @ForeignKey(name = "FIELD_TYPE_FIELD_TYPE_DEFINITION_FK"))
	@ToString.Exclude
	private FieldTypeDefinition fieldTypeDefinition;
}
