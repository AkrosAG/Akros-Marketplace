
package ch.akros.marketplace.administration.views;

import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasValue.ValueChangeEvent;
import com.vaadin.flow.component.HasValue.ValueChangeListener;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.dependency.Uses;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.formlayout.FormLayout.ResponsiveStep;
import com.vaadin.flow.component.formlayout.FormLayout.ResponsiveStep.LabelsPosition;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H4;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.renderer.TemplateRenderer;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;

import ch.akros.marketplace.administration.constants.EFieldTypeDefinition;
import ch.akros.marketplace.administration.dataservice.entity.Category;
import ch.akros.marketplace.administration.dataservice.entity.FieldType;
import ch.akros.marketplace.administration.dataservice.entity.FieldTypeDefinition;
import ch.akros.marketplace.administration.layout.MainLayout;
import ch.akros.marketplace.administration.service.CategoryService;
import ch.akros.marketplace.administration.service.FieldTypeDefinitionService;
import ch.akros.marketplace.administration.service.FieldTypeService;

@PageTitle("Akros Administrator:Field Types")
@Route(value = "fieldtypes/:categoryId?/:fieldTypeId?/:action?(edit)", layout = MainLayout.class)
@RouteAlias(value = "fieldtypes/:categoryId", layout = MainLayout.class)
@Uses(Icon.class)
public class FieldTypeView extends Div implements BeforeEnterObserver {
  // path templates
  public static final String            LIST_ROUTE_TEMPLATE            = "fieldtypes/%d";
  private static final String           EDIT_FIELD_TYPE_ROUTE_TEMPLATE = "fieldtypes/%d/%d/edit";

  // path parameter
  private static final String           PATH_CATEGORY_ID               = "categoryId";
  private static final String           PATH_FIELD_TYPE_ID             = "fieldTypeId";

  // id for focus control
  private static final String           TEXT_CONTROL_DESCRIPTION       = "TEXT_CONTROL_DESCRIPTION";

  // services
  private CategoryService               categoryService;
  private FieldTypeService              fieldTypeService;
  private FieldTypeDefinitionService    fieldTypeDefinitionService;

  private Grid<FieldType>               grid                           = new Grid<>(FieldType.class, false);

  private Long                          categoryId;

  // grid header control
  private H4                            gridHeader;
  private AtomicBoolean                 gridHeaderInitialized          = new AtomicBoolean(false);

  // UI components
  private NumberField                   txtFieldTypeId;
  private TextArea                      txtDescription;
  private TextField                     txtShortDescription;
  private NumberField                   txtMinValue;
  private NumberField                   txtMaxValue;
  private NumberField                   txtSortNumber;
  private Checkbox                      chkOffer;
  private Checkbox                      chkSearch;
  private Checkbox                      chkRequired;
  private Checkbox                      chkSearchable;
  private ComboBox<FieldTypeDefinition> comboFieldTypeDefinitions;

  private Button                        btnAddAddFieldType;
  private Button                        btnEditFieldTypesChooses;
  private Button                        btnDelete;
  private Button                        btnSave;

  public FieldTypeView(@Autowired CategoryService categoryService,
                       @Autowired FieldTypeService fieldTypeService,
                       @Autowired FieldTypeDefinitionService fieldTypeDefinitionService)
  {
    this.categoryService = categoryService;
    this.fieldTypeService = fieldTypeService;
    this.fieldTypeDefinitionService = fieldTypeDefinitionService;

    addClassNames("master-detail-view", "flex", "flex-col", "h-full");

    // Create UI
    SplitLayout splitLayout = new SplitLayout();
    splitLayout.setSizeFull();

    splitLayout.addToPrimary(createGridLayout());
    splitLayout.addToSecondary(createEditorLayout());

    add(splitLayout);

    unsetGridSelectedButtons();
    clearEditorForm();
  }

  @Override
  public void beforeEnter(BeforeEnterEvent event) {
    categoryId = event.getRouteParameters().getLong(PATH_CATEGORY_ID).orElse(null);
    Long fieldTypeId = event.getRouteParameters().getLong(PATH_FIELD_TYPE_ID).orElse(null);

    if (categoryId != null && !gridHeaderInitialized.getAndSet(true)) {
      Category category = categoryService.findById(categoryId);
      gridHeader.setText(String.format("Field Types (Category %d: %s)",
                                       category.getCategoryId(),
                                       category.getShortDescription()));
    }

    if (fieldTypeId != null) {
      FieldType fieldType = fieldTypeService.findById(fieldTypeId);

      FieldTypeDefinition fieldTypeDefinition = fieldTypeDefinitionService.findById(fieldType.getFieldTypeDefinition()
                                                                                             .getFieldTypeDefinitionId());

      if (fieldType != null && fieldTypeDefinition != null) {
        txtFieldTypeId.setValue(fieldType.getFieldTypeId().doubleValue());
        txtDescription.setValue(fieldType.getDescription());
        txtShortDescription.setValue(fieldType.getShortDescription());

        txtSortNumber.setValue(fieldType.getSortNumber() != null ? fieldType.getSortNumber().doubleValue() : null);
        chkOffer.setValue(fieldType.isOffer());
        chkSearch.setValue(fieldType.isSearch());
        chkRequired.setValue(fieldType.isRequired());
        chkSearchable.setValue(fieldType.isSearchable());
        comboFieldTypeDefinitions.setValue(fieldTypeDefinitionService.findById(fieldType.getFieldTypeDefinition()
                                                                                        .getFieldTypeDefinitionId()));

        if (needsMinMaxRange(fieldTypeDefinition)) {
          txtMinValue.setEnabled(true);
          txtMaxValue.setEnabled(true);
          txtMinValue.setRequiredIndicatorVisible(true);
          txtMaxValue.setRequiredIndicatorVisible(true);

          txtMinValue.setValue(fieldType.getMinValue() != null ? fieldType.getMinValue().doubleValue() : null);
          txtMaxValue.setValue(fieldType.getMaxValue() != null ? fieldType.getMaxValue().doubleValue() : null);
        }
        else {
          txtMinValue.setEnabled(false);
          txtMaxValue.setEnabled(false);
          txtMinValue.setRequiredIndicatorVisible(false);
          txtMaxValue.setRequiredIndicatorVisible(false);
          txtMinValue.setValue(null);
          txtMaxValue.setValue(null);
        }

        return;
      }
    }

    if (categoryId != null) {
      refreshGrid();
      return;
    }

    UI.getCurrent().navigate(CategoryView.class);
    Notification.show("No CategorieID set navigating back to categories");
  }

  private Component createGridLayout() {
    Div div = new Div();
    div.setClassName("w-full flex-wrap bg-contrast-5 py-s px-l");
    div.setId("grid-wrapper");
    div.setWidth("70%");
    div.setHeightFull();
    div.add(createGridHeader());
    div.add(createGrid());
    div.add(createGridButtons());
    return div;
  }

  private Component createGridHeader() {
    gridHeader = new H4("Field Types");
    return gridHeader;
  }

  private String getBooleanRendererTemplate(String itemName) {
    final String BOOLEAN_RENDERER_STYLE = "<iron-icon hidden='[[!item.%s]]' icon='vaadin:check' style='width: var(--lumo-icon-size-s); height: var(--lumo-icon-size-s); color: var(--lumo-primary-text-color);'></iron-icon><iron-icon hidden='[[item.%s]]' icon='vaadin:minus' style='width: var(--lumo-icon-size-s); height: var(--lumo-icon-size-s); color: var(--lumo-disabled-text-color);'></iron-icon>";

    return String.format(BOOLEAN_RENDERER_STYLE, itemName, itemName);
  }

  private Component createGrid() {
    // Configure Grid
    grid.addColumn(FieldType::getFieldTypeId).setHeader("fieldTypeId").setWidth("7em").setFlexGrow(0);
    grid.addColumn(FieldType::getDescription).setHeader("description").setAutoWidth(true);
    grid.addColumn(FieldType::getShortDescription).setHeader("shortDescription").setAutoWidth(true);

    final Map<Integer, FieldTypeDefinition> fieldTypeDefinitionMap = fieldTypeDefinitionService.list()
                                                                                               .stream()
                                                                                               .collect(Collectors.toMap(e -> e.getFieldTypeDefinitionId(),
                                                                                                                         e -> e));

    grid.addColumn(e -> String.format("%d: %s",
                                      e.getFieldTypeDefinition().getFieldTypeDefinitionId(),
                                      fieldTypeDefinitionMap.get(e.getFieldTypeDefinition().getFieldTypeDefinitionId())
                                                            .getDescription()))
        .setHeader("fieldTypeDefinition")
        .setWidth("12em")
        .setAutoWidth(true);

    TemplateRenderer<FieldType> offerRenderer = TemplateRenderer.<FieldType> of(getBooleanRendererTemplate("offer"))
                                                                .withProperty("offer", FieldType::isOffer);
    grid.addColumn(offerRenderer).setHeader("offer").setWidth("7em").setFlexGrow(0);

    TemplateRenderer<FieldType> searchRenderer = TemplateRenderer.<FieldType> of(getBooleanRendererTemplate("search"))
                                                                 .withProperty("search", FieldType::isSearch);
    grid.addColumn(searchRenderer).setHeader("search").setWidth("7em").setFlexGrow(0);

    TemplateRenderer<FieldType> requiredRenderer = TemplateRenderer.<FieldType> of(getBooleanRendererTemplate("required"))
                                                                   .withProperty("required", FieldType::isRequired);
    grid.addColumn(requiredRenderer).setHeader("required").setWidth("7em").setFlexGrow(0);

    TemplateRenderer<FieldType> searchable = TemplateRenderer.<FieldType> of(getBooleanRendererTemplate("searchable"))
                                                             .withProperty("searchable", FieldType::isSearchable);
    grid.addColumn(searchable).setHeader("searchable").setWidth("7em").setFlexGrow(0);

    grid.addColumn(FieldType::getSortNumber).setHeader("sortNumber").setWidth("8em").setFlexGrow(0);

    grid.setHeight("70%");
    grid.setClassName("flex-grow");

    // when a row is selected or deselected, populate form
    grid.asSingleSelect().addValueChangeListener(event -> {
      if (event.getValue() != null) {
        UI.getCurrent()
          .navigate(String.format(EDIT_FIELD_TYPE_ROUTE_TEMPLATE,
                                  event.getValue().getCategory().getCategoryId(),
                                  event.getValue().getFieldTypeId()));
        setGridSelectedButtons();
      }
      else {
        UI.getCurrent().navigate(String.format(LIST_ROUTE_TEMPLATE, categoryId));
        unsetGridSelectedButtons();
        clearEditorForm();
      }
    });

    return grid;
  }

  private Component createGridButtons() {
    HorizontalLayout horizontalLayout = new HorizontalLayout();

    horizontalLayout.addClassNames("flex", "items-center", "my-m");

    btnAddAddFieldType = new Button("Add Field Type");
    btnAddAddFieldType.addThemeVariants(ButtonVariant.LUMO_PRIMARY, ButtonVariant.LUMO_SUCCESS);
    btnAddAddFieldType.addClickListener(e -> {
      try {
        unsetGridSelectedButtons();
        clearEditorForm();
        UI.getCurrent().getPage().executeJs("document.getElementById(\"TEXT_CONTROL_DESCRIPTION\").focus();");
      }
      catch (Exception ex) {
        Notification.show("An exception happened while trying switch to Field Types : " + ex.getMessage());
      }
    });

    btnEditFieldTypesChooses = new Button("Edit Field Types Chooses");
    btnEditFieldTypesChooses.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
    btnEditFieldTypesChooses.addClickListener(e -> {
      try {
        UI.getCurrent()
          .navigate(String.format(FieldTypeChooserView.LIST_ROUTE_TEMPLATE,
                                  categoryId,
                                  grid.getSelectedItems().iterator().next().getFieldTypeId()));
      }
      catch (Exception ex) {
        Notification.show("An exception happened while trying switch to Field Types Chooses: " + ex.getMessage());
      }
    });

    btnDelete = new Button("Delete");
    btnDelete.addThemeVariants(ButtonVariant.LUMO_PRIMARY, ButtonVariant.LUMO_ERROR);
    btnDelete.addClickListener(e -> {
      try {
        FieldType fieldType = grid.getSelectedItems().iterator().next();
        fieldTypeService.delete(fieldType.getFieldTypeId());
        Notification.show("Field Type deleted.");

        refreshGrid();
      }
      catch (Exception ex) {
        Notification.show("An exception happened while trying to delete the Field Type : " + ex.getMessage());
      }
    });

    horizontalLayout.add(btnAddAddFieldType, btnEditFieldTypesChooses, btnDelete);

    return horizontalLayout;
  }

  private Component createEditorLayout() {
    Div div = new Div();
    div.setClassName("w-full flex-wrap bg-contrast-5 py-s px-l");
    div.setWidth("30%");

    div.add(createEditorHeader());
    div.add(createEditorFormComponents());
    div.add(createEditorButtons());

    return div;
  }

  private Component createEditorHeader() {
    return new H4("Edit Field Type (Table: FIELD_TYPE)");
  }

  private Component createEditorFormComponents() {
    Div div = new Div();

    FormLayout formLayout = new FormLayout();
    formLayout.setResponsiveSteps(new ResponsiveStep("0", 1, LabelsPosition.TOP));

    ValueChangeListener<ValueChangeEvent<?>> listener = getUpdateSaveButtonValueChangeListener();

    txtFieldTypeId = new NumberField("fieldTypeId (Column: FIELD_TYPE_ID)");
    txtFieldTypeId.setReadOnly(true);

    txtDescription = new TextArea("description (Column: DESCRIPTION)");
    txtDescription.setClassName("full-width");
    txtDescription.setRequired(true);
    txtDescription.setHeightFull();
    txtDescription.setValueChangeMode(ValueChangeMode.LAZY);
    txtDescription.addValueChangeListener(listener);
    txtDescription.setId(TEXT_CONTROL_DESCRIPTION);

    txtShortDescription = new TextField("shortDescription (Column: SHORT_DESCRIPTON)");
    txtShortDescription.setClassName("full-width");
    txtShortDescription.setRequired(true);
    txtShortDescription.setValueChangeMode(ValueChangeMode.LAZY);
    txtShortDescription.addValueChangeListener(listener);

    comboFieldTypeDefinitions = new ComboBox<FieldTypeDefinition>("fieldTypeDefinitionId (Column: FIELD_TYPE_DEFINITION_ID)",
                                                                  fieldTypeDefinitionService.list());
    comboFieldTypeDefinitions.setItemLabelGenerator(e -> String.format("%d: %s",
                                                                       e.getFieldTypeDefinitionId(),
                                                                       e.getDescription()));
    comboFieldTypeDefinitions.setRequired(true);
    comboFieldTypeDefinitions.addValueChangeListener(listener);

    txtMinValue = new NumberField("minValue (Column: MIN_VALUE)");
    txtMinValue.setClassName("full-width");
    txtMinValue.setRequiredIndicatorVisible(true);
    txtMinValue.setValueChangeMode(ValueChangeMode.LAZY);
    txtMinValue.addValueChangeListener(listener);

    txtMaxValue = new NumberField("maxValue (Column: MAX_VALUE)");
    txtMaxValue.setClassName("full-width");
    txtMaxValue.setRequiredIndicatorVisible(true);
    txtMaxValue.setValueChangeMode(ValueChangeMode.LAZY);
    txtMaxValue.addValueChangeListener(listener);

    chkOffer = new Checkbox("offer (Column: OFFER)");
    chkOffer.setClassName("full-width");
    chkSearch = new Checkbox("search (Column: SEARCH)");
    chkSearch.setClassName("full-width");
    chkRequired = new Checkbox("required (Column: REQUIRED)");
    chkRequired.setClassName("full-width");
    chkSearchable = new Checkbox("searchable (Column: SEARCHABLE)");
    chkSearchable.setClassName("full-width");

    txtSortNumber = new NumberField("sortNumber (Column: SORT_NUMBER)");
    txtSortNumber.setClassName("full-width");
    txtSortNumber.setRequiredIndicatorVisible(true);
    txtSortNumber.setValueChangeMode(ValueChangeMode.LAZY);
    txtSortNumber.addValueChangeListener(listener);

    formLayout.add(txtFieldTypeId,
                   txtDescription,
                   txtShortDescription,
                   comboFieldTypeDefinitions,
                   txtMinValue,
                   txtMaxValue,
                   chkOffer,
                   chkSearch,
                   chkRequired,
                   chkSearchable,
                   txtSortNumber);

    div.add(formLayout);

    return div;
  }

  private ValueChangeListener<ValueChangeEvent<?>> getUpdateSaveButtonValueChangeListener() {
    return e -> {
      boolean enableSave = !txtDescription.isEmpty() //
                           && !txtShortDescription.isEmpty() //
                           && !txtSortNumber.isEmpty() //
                           && !comboFieldTypeDefinitions.isEmpty();

      if (needsMinMaxRange(comboFieldTypeDefinitions.getValue())) {
        enableSave &= !txtMinValue.isEmpty() && !txtMaxValue.isEmpty();

        txtMinValue.setEnabled(true);
        txtMaxValue.setEnabled(true);
        txtMinValue.setRequiredIndicatorVisible(true);
        txtMaxValue.setRequiredIndicatorVisible(true);
      }
      else {
        txtMinValue.setEnabled(false);
        txtMaxValue.setEnabled(false);
        txtMinValue.setRequiredIndicatorVisible(false);
        txtMaxValue.setRequiredIndicatorVisible(false);
        txtMinValue.setValue(null);
        txtMaxValue.setValue(null);
      }

      btnSave.setEnabled(enableSave);
    };
  }

  private boolean needsMinMaxRange(FieldTypeDefinition fieldTypeDefinition) {
    if (fieldTypeDefinition == null) {
      return false;
    }

    switch (EFieldTypeDefinition.values()[fieldTypeDefinition.getFieldTypeDefinitionId()]) {
      case NUMBER:
      case PRICE:
      case TEXT_MULTI_LINE:
      case TEXT_SINGLE_LINE:
        return true;

      default:
        return false;
    }
  }

  private Component createEditorButtons() {
    HorizontalLayout horizontalLayout = new HorizontalLayout();
    horizontalLayout.addClassNames("flex", "items-center", "my-m");

    horizontalLayout.setSpacing(true);

    Button cancel = new Button("Cancel");
    cancel.addClickListener(e -> {
      clearEditorForm();
      unsetGridSelectedButtons();
    });

    btnSave = new Button("Save");
    btnSave.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
    btnSave.addClickListener(e -> {
      try {
        fieldTypeService.save(categoryId,
                              txtFieldTypeId.isEmpty() ? null : txtFieldTypeId.getValue().longValue(),
                              txtDescription.getValue(),
                              txtShortDescription.getValue(),
                              txtMinValue.isEmpty() ? null : txtMinValue.getValue().intValue(),
                              txtMaxValue.isEmpty() ? null : txtMaxValue.getValue().intValue(),
                              txtSortNumber.getValue().intValue(),
                              chkRequired.getValue(),
                              chkSearchable.getValue(),
                              chkSearch.getValue(),
                              chkOffer.getValue(),
                              comboFieldTypeDefinitions.getValue().getFieldTypeDefinitionId());

        clearEditorForm();
        refreshGrid();

        Notification.show("Field Type stored.");

        UI.getCurrent().navigate(String.format(LIST_ROUTE_TEMPLATE, categoryId));
      }
      catch (Exception ex) {
        Notification.show("An exception happened while trying to store the Field Type : " + ex.getMessage());
      }
    });

    horizontalLayout.add(btnSave, cancel);

    return horizontalLayout;
  }

  private void refreshGrid() {
    grid.setItems(fieldTypeService.list(categoryId));
    grid.select(null);
    grid.getDataProvider().refreshAll();
    btnDelete.setEnabled(false);
    btnEditFieldTypesChooses.setEnabled(false);
  }

  private void unsetGridSelectedButtons() {
    grid.select(null);
    grid.getDataProvider().refreshAll();
    btnDelete.setEnabled(false);
    btnEditFieldTypesChooses.setEnabled(false);
  }

  private void setGridSelectedButtons() {
    btnDelete.setEnabled(true);

    switch (grid.getSelectedItems().iterator().next().getFieldTypeDefinition().getFieldTypeDefinitionId()) {
      case 5:
      case 6: {
        btnEditFieldTypesChooses.setEnabled(true);
        break;
      }

      default: {
        btnEditFieldTypesChooses.setEnabled(false);
      }
    }
  }

  private void clearEditorForm() {
    txtFieldTypeId.clear();
    txtDescription.clear();
    txtShortDescription.clear();
    txtMinValue.clear();
    txtMaxValue.clear();
    txtSortNumber.clear();
    chkOffer.clear();
    chkSearch.clear();
    chkRequired.clear();
    chkSearchable.clear();
    comboFieldTypeDefinitions.clear();
    btnSave.setEnabled(false);
  }
}
