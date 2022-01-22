
package ch.akros.marketplace.administration.views;

import org.springframework.beans.factory.annotation.Autowired;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasValue.ValueChangeEvent;
import com.vaadin.flow.component.HasValue.ValueChangeListener;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.formlayout.FormLayout.ResponsiveStep;
import com.vaadin.flow.component.formlayout.FormLayout.ResponsiveStep.LabelsPosition;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H4;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;

import ch.akros.marketplace.administration.dataservice.entity.Category;
import ch.akros.marketplace.administration.layout.MainLayout;
import ch.akros.marketplace.administration.service.CategoryService;

@PageTitle("Akros Administrator:Categories")
@Route(value = "categories/:categoryId?/:action?(edit)", layout = MainLayout.class)
@RouteAlias(value = "", layout = MainLayout.class)
public class CategoryView extends Div implements BeforeEnterObserver {
  // path templates
  private final static String EDIT_CATEGORY_ROUTE_TEMPLATE = "categories/%d/edit";

  // id for focus control
  private final static String TEXT_CONTROL_DESCRIPTION     = "TEXT_CONTROL_DESCRIPTION";

  // path parameter
  private final static String PATH_CATEGORY_ID             = "categoryId";

  // services
  private CategoryService     categoryService;

  private Grid<Category>      grid                         = new Grid<>(Category.class, false);

  // UI components
  private NumberField         txtCategoryId;
  private TextArea            txtDescription;
  private TextField           txtShortDescription;

  private Button              btnAddCategory;
  private Button              btnEditFieldTypes;
  private Button              btnDelete;
  private Button              btnSave;

  public CategoryView(@Autowired CategoryService categoryService) {
    this.categoryService = categoryService;

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
    Long categoryId = event.getRouteParameters().getLong(PATH_CATEGORY_ID).orElse(null);

    if (categoryId != null) {
      Category category = categoryService.findById(categoryId);

      if (category != null) {
        txtCategoryId.setValue(Double.valueOf(category.getCategoryId()));
        txtDescription.setValue(category.getDescription());
        txtShortDescription.setValue(category.getShortDescription());
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
    return new H4("Categories");
  }

  private Component createGrid() {
    // Configure Grid
    grid.addColumn(Category::getCategoryId).setHeader("categoryId").setWidth("8em").setFlexGrow(0);
    grid.addColumn(Category::getDescription).setHeader("description");
    grid.addColumn(Category::getShortDescription).setHeader("shortDescription");

    grid.setHeight("70%");
    grid.setClassName("flex-grow");

    // when a row is selected or deselected, populate form
    grid.asSingleSelect().addValueChangeListener(event -> {
      if (event.getValue() != null) {
        UI.getCurrent().navigate(String.format(EDIT_CATEGORY_ROUTE_TEMPLATE, event.getValue().getCategoryId()));
        setGridSelectedButtons();
      }
      else {
        unsetGridSelectedButtons();
        clearEditorForm();
        UI.getCurrent().navigate(CategoryView.class);
      }
    });

    return grid;
  }

  private Component createGridButtons() {
    HorizontalLayout horizontalLayout = new HorizontalLayout();

    horizontalLayout.addClassNames("flex", "items-center", "my-m");

    btnAddCategory = new Button("Add Category");
    btnAddCategory.addThemeVariants(ButtonVariant.LUMO_PRIMARY, ButtonVariant.LUMO_SUCCESS);
    btnAddCategory.addClickListener(e -> {
      try {
        unsetGridSelectedButtons();
        clearEditorForm();
        UI.getCurrent().getPage().executeJs("document.getElementById(\"TEXT_CONTROL_DESCRIPTION\").focus();");
      }
      catch (Exception ex) {
        Notification.show("An exception happened while trying switch to Field Types : " + ex.getMessage());
      }
    });

    btnEditFieldTypes = new Button("Edit Field Types");
    btnEditFieldTypes.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
    btnEditFieldTypes.addClickListener(e -> {
      try {
        UI.getCurrent()
          .navigate(String.format(FieldTypeView.LIST_ROUTE_TEMPLATE,
                                  grid.getSelectedItems().iterator().next().getCategoryId()));
      }
      catch (Exception ex) {
        Notification.show("An exception happened while trying switch to Field Types : " + ex.getMessage());
      }
    });

    btnDelete = new Button("Delete");
    btnDelete.addThemeVariants(ButtonVariant.LUMO_PRIMARY, ButtonVariant.LUMO_ERROR);
    btnDelete.addClickListener(e -> {
      try {
        Category category = grid.getSelectedItems().iterator().next();
        categoryService.delete(category.getCategoryId());
        Notification.show("Category deleted.");

        refreshGrid();
      }
      catch (Exception ex) {
        Notification.show("An exception happened while trying to delete the Category : " + ex.getMessage());
      }
    });

    horizontalLayout.add(btnAddCategory, btnEditFieldTypes, btnDelete);

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
    return new H4("Edit Category (Table: CATEGORY)");
  }

  private Component createEditorFormComponents() {
    Div div = new Div();

    FormLayout formLayout = new FormLayout();
    formLayout.setResponsiveSteps(new ResponsiveStep("0", 1, LabelsPosition.TOP));
    txtCategoryId = new NumberField("categoryId (Column: CATEGORY_ID)");
    txtCategoryId.setReadOnly(true);

    ValueChangeListener<ValueChangeEvent<?>> listener = getUpdateSaveButtonValueChangeListener();

    txtDescription = new TextArea("description (Column: DESCRIPTION)");
    txtDescription.setId(TEXT_CONTROL_DESCRIPTION);
    txtDescription.setClassName("full-width");
    txtDescription.setRequired(true);
    txtDescription.setHeightFull();
    txtDescription.setValueChangeMode(ValueChangeMode.LAZY);
    txtDescription.addValueChangeListener(listener);

    txtShortDescription = new TextField("shortDescription (Column: SHORT_DESCRIPTON)");
    txtShortDescription.setClassName("full-width");
    txtShortDescription.setRequired(true);
    txtShortDescription.setValueChangeMode(ValueChangeMode.LAZY);
    txtShortDescription.addValueChangeListener(listener);

    formLayout.add(txtCategoryId, txtDescription, txtShortDescription);
    div.add(formLayout);

    return div;
  }

  private ValueChangeListener<ValueChangeEvent<?>> getUpdateSaveButtonValueChangeListener() {
    return e -> {
      if (!txtDescription.isEmpty() && !txtShortDescription.isEmpty()) {
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
        categoryService.save(!txtCategoryId.isEmpty() ? txtCategoryId.getValue().longValue() : null,
                             txtDescription.getValue(),
                             txtShortDescription.getValue());

        clearEditorForm();
        refreshGrid();

        Notification.show("Category stored.");
        UI.getCurrent().navigate(CategoryView.class);
      }
      catch (Exception ex) {
        Notification.show("An exception happened while trying to store the Category : " + ex.getMessage());
      }
    });

    horizontalLayout.add(btnSave, cancel);

    return horizontalLayout;
  }

  private void refreshGrid() {
    grid.setItems(categoryService.list());
    grid.select(null);
    grid.getDataProvider().refreshAll();
    btnDelete.setEnabled(false);
    btnEditFieldTypes.setEnabled(false);
  }

  private void unsetGridSelectedButtons() {
    grid.select(null);
    grid.getDataProvider().refreshAll();
    btnDelete.setEnabled(false);
    btnEditFieldTypes.setEnabled(false);
  }

  private void setGridSelectedButtons() {
    btnDelete.setEnabled(true);
    btnEditFieldTypes.setEnabled(true);
  }

  private void clearEditorForm() {
    txtCategoryId.clear();
    txtDescription.clear();
    txtShortDescription.clear();
    btnSave.setEnabled(false);
  }
}
