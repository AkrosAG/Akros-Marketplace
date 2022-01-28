
package ch.akros.marketplace.administration.views;

import java.util.concurrent.atomic.AtomicBoolean;

import org.springframework.beans.factory.annotation.Autowired;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasValue.ValueChangeEvent;
import com.vaadin.flow.component.HasValue.ValueChangeListener;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.dependency.Uses;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.formlayout.FormLayout.ResponsiveStep;
import com.vaadin.flow.component.formlayout.FormLayout.ResponsiveStep.LabelsPosition;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.H4;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;

import ch.akros.marketplace.administration.dataservice.entity.FieldType;
import ch.akros.marketplace.administration.dataservice.entity.FieldTypeChoose;
import ch.akros.marketplace.administration.layout.MainLayout;
import ch.akros.marketplace.administration.service.FieldTypeChooseService;
import ch.akros.marketplace.administration.service.FieldTypeService;

@PageTitle("Akros Administrator:Field Type Chooser")
@Route(value = "fieldtypeschooser/:categoryId?/:fieldTypeId?/:fieldTypeChooseId?/:action?(edit)",
    layout = MainLayout.class)
@RouteAlias(value = "fieldtypeschooser/:categoryId?/:fieldTypeId?", layout = MainLayout.class)
@Uses(Icon.class)
public class FieldTypeChooserView extends Div implements BeforeEnterObserver {
  // path templates
  public static final String     LIST_ROUTE_TEMPLATE            = "fieldtypeschooser/%d/%d";
  private static final String    EDIT_FIELD_TYPE_ROUTE_TEMPLATE = "fieldtypeschooser/%d/%d/%d/edit";

  // path parameter
  private static final String    PATH_CATEGORY_ID               = "categoryId";
  private static final String    PATH_FIELD_TYPE_ID             = "fieldTypeId";
  private static final String    PATH_FIELD_TYPE_CHOOSE_ID      = "fieldTypeChooseId";

  // id for focus control
  private final static String    TEXT_CONTROL_DESCRIPTION       = "TEXT_CONTROL_DESCRIPTION";

  // services
  private FieldTypeService       fieldTypeService;
  private FieldTypeChooseService fieldTypeChooseService;

  private Grid<FieldTypeChoose>  grid                           = new Grid<>(FieldTypeChoose.class, false);

  private Long                   categoryId;
  private Long                   fieldTypeId;

  // grid header control
  private H4                     gridHeader;
  private AtomicBoolean          gridHeaderInitialized          = new AtomicBoolean(false);

  // UI components
  private NumberField            txtFieldTypeChooseId;
  private TextField              txtDescription;
  private NumberField            txtSortNumber;

  private Button                 btnAddFieldTypeChoose;
  private Button                 btnBackToFieldTypes;
  private Button                 btnDelete;
  private Button                 btnSave;

  public FieldTypeChooserView(@Autowired FieldTypeService fieldTypeService,
                              @Autowired FieldTypeChooseService fieldTypeChooseService)
  {
    this.fieldTypeService = fieldTypeService;
    this.fieldTypeChooseService = fieldTypeChooseService;

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
    fieldTypeId = event.getRouteParameters().getLong(PATH_FIELD_TYPE_ID).orElse(null);
    Long fieldTypeChooseId = event.getRouteParameters().getLong(PATH_FIELD_TYPE_CHOOSE_ID).orElse(null);

    if (fieldTypeId != null && !gridHeaderInitialized.getAndSet(true)) {
      FieldType fieldType = fieldTypeService.findById(fieldTypeId);
      gridHeader.setText(String.format("Field Type Chooses (Category %d: %s -> Field Type %d: %s)",
                                       fieldType.getCategory().getCategoryId(),
                                       fieldType.getCategory().getShortDescription(),
                                       fieldType.getFieldTypeId(),
                                       fieldType.getShortDescription()));
    }

    if (fieldTypeChooseId != null) {
      FieldTypeChoose fieldTypeChoose = fieldTypeChooseService.findById(fieldTypeChooseId);

      if (fieldTypeChoose != null) {
        txtFieldTypeChooseId.setValue(Double.valueOf(fieldTypeChoose.getFieldTypeChooseId()));
        txtDescription.setValue(fieldTypeChoose.getDescription());
        txtSortNumber.setValue(fieldTypeChoose.getSortNumber().doubleValue());

        return;
      }
    }

    refreshGrid();
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
    gridHeader = new H4("Field Type Chooses");
    return gridHeader;
  }

  private Component createGrid() {
    // Configure Grid
    grid.addColumn(FieldTypeChoose::getFieldTypeChooseId)
        .setHeader("fieldTypeChooseId")
        .setWidth("10em")
        .setFlexGrow(0);
    grid.addColumn(FieldTypeChoose::getDescription).setHeader("description").setAutoWidth(true);
    grid.addColumn(FieldTypeChoose::getSortNumber).setHeader("sortNumber").setWidth("8em").setFlexGrow(0);

    grid.setHeight("70%");
    grid.setClassName("flex-grow");

    // when a row is selected or deselected, populate form
    grid.asSingleSelect().addValueChangeListener(event -> {
      if (event.getValue() != null) {
        UI.getCurrent()
          .navigate(String.format(EDIT_FIELD_TYPE_ROUTE_TEMPLATE,
                                  categoryId,
                                  fieldTypeId,
                                  event.getValue().getFieldTypeChooseId()));
        setGridSelectedButtons();
      }
      else {
        UI.getCurrent().navigate(String.format(LIST_ROUTE_TEMPLATE, categoryId, fieldTypeId));
        unsetGridSelectedButtons();
        clearEditorForm();
      }
    });

    return grid;
  }

  private Component createGridButtons() {
    HorizontalLayout horizontalLayout = new HorizontalLayout();

    horizontalLayout.addClassNames("flex", "items-center", "my-m");

    btnAddFieldTypeChoose = new Button("Add Field Type Choose");
    btnAddFieldTypeChoose.addThemeVariants(ButtonVariant.LUMO_PRIMARY, ButtonVariant.LUMO_SUCCESS);
    btnAddFieldTypeChoose.addClickListener(e -> {
      try {
        unsetGridSelectedButtons();
        clearEditorForm();
        UI.getCurrent().getPage().executeJs("document.getElementById(\"TEXT_CONTROL_DESCRIPTION\").focus();");
      }
      catch (Exception ex) {
        Notification.show("An exception happened while trying switch to Field Types : " + ex.getMessage());
      }
    });

    btnBackToFieldTypes = new Button("Back to Field Types");
    btnBackToFieldTypes.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
    btnBackToFieldTypes.addClickListener(e -> {
      try {
        UI.getCurrent().navigate(String.format(FieldTypeView.LIST_ROUTE_TEMPLATE, categoryId));
      }
      catch (Exception ex) {
        Notification.show("An exception happened while trying switch to Field Types : " + ex.getMessage());
      }
    });

    btnDelete = new Button("Delete");
    btnDelete.addThemeVariants(ButtonVariant.LUMO_PRIMARY, ButtonVariant.LUMO_ERROR);
    btnDelete.addClickListener(e -> {
      try {
        FieldTypeChoose fieldTypeChoose = grid.getSelectedItems().iterator().next();
        fieldTypeChooseService.delete(fieldTypeChoose.getFieldTypeChooseId());
        Notification.show("Field Type Choose deleted.");

        refreshGrid();
      }
      catch (Exception ex) {
        Notification.show("An exception happened while trying to delete the Field Type Choose : " + ex.getMessage());
      }
    });

    horizontalLayout.add(btnAddFieldTypeChoose, btnBackToFieldTypes, btnDelete);
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
    return new H3("Edit Field Type Choose (Table:FIELD_TYPE_CHOOSE)");
  }

  private Component createEditorFormComponents() {
    Div div = new Div();

    FormLayout formLayout = new FormLayout();
    formLayout.setResponsiveSteps(new ResponsiveStep("0", 1, LabelsPosition.TOP));
    txtFieldTypeChooseId = new NumberField("fieldTypeChooseId (Column: FIELD_TYPE_CHOOSE_ID)");
    txtFieldTypeChooseId.setReadOnly(true);

    ValueChangeListener<ValueChangeEvent<?>> listener = getUpdateSaveButtonValueChangeListener();

    txtDescription = new TextField("description (Column: DESCRIPTION)");
    txtDescription.setClassName("full-width");
    txtDescription.setRequired(true);
    txtDescription.addValueChangeListener(listener);
    txtDescription.setValueChangeMode(ValueChangeMode.LAZY);
    txtDescription.setId(TEXT_CONTROL_DESCRIPTION);

    txtSortNumber = new NumberField("sortNumber (Column: SORT_NUMBER)");
    txtSortNumber.setClassName("full-width");
    txtSortNumber.setRequiredIndicatorVisible(true);
    txtSortNumber.setValueChangeMode(ValueChangeMode.LAZY);
    txtSortNumber.addValueChangeListener(listener);

    formLayout.add(txtFieldTypeChooseId, txtDescription, txtSortNumber);
    div.add(formLayout);

    return div;
  }

  private ValueChangeListener<ValueChangeEvent<?>> getUpdateSaveButtonValueChangeListener() {
    return e -> {
      if (!txtDescription.isEmpty() && !txtSortNumber.isEmpty()) {
        btnSave.setEnabled(true);
      }
      else {
        btnSave.setEnabled(false);
      }
    };
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
        fieldTypeChooseService.save(fieldTypeId,
                                    txtFieldTypeChooseId.isEmpty() ? null : txtFieldTypeChooseId.getValue().longValue(),
                                    txtDescription.getValue(),
                                    txtSortNumber.getValue().intValue());

        clearEditorForm();
        refreshGrid();

        Notification.show("Field Type stored.");

        UI.getCurrent().navigate(String.format(LIST_ROUTE_TEMPLATE, categoryId, fieldTypeId));
      }
      catch (Exception ex) {
        Notification.show("An exception happened while trying to store the Field Type Choose : " + ex.getMessage());
      }
    });

    horizontalLayout.add(btnSave, cancel);

    return horizontalLayout;
  }

  private void refreshGrid() {
    grid.setItems(fieldTypeChooseService.list(fieldTypeId));
    grid.select(null);
    grid.getDataProvider().refreshAll();
    btnDelete.setEnabled(false);
  }

  private void unsetGridSelectedButtons() {
    grid.select(null);
    grid.getDataProvider().refreshAll();
    btnDelete.setEnabled(false);
  }

  private void setGridSelectedButtons() {
    btnDelete.setEnabled(true);
  }

  private void clearEditorForm() {
    txtFieldTypeChooseId.clear();
    txtDescription.clear();
    txtSortNumber.clear();
    btnSave.setEnabled(false);
  }
}
