
package ch.akros.marketplace.administration.layout;

import java.util.ArrayList;
import java.util.List;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Header;
import com.vaadin.flow.component.html.ListItem;
import com.vaadin.flow.component.html.Nav;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.UnorderedList;
import com.vaadin.flow.component.page.Push;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.theme.Theme;

import ch.akros.marketplace.administration.views.CategoryView;

/**
 * The main view is a top-level placeholder for other views.
 */
@PWA(name = "Akros Marketplace Administration", shortName = "Akros Marketplace Administration",
    enableInstallPrompt = false)
@Push
@Theme(themeFolder = "akrosmarketplaceadministration")
@PageTitle("Main")
public class MainLayout extends AppLayout {

  public MainLayout() {
    addToNavbar(createHeaderContent());
  }

  private Component createHeaderContent() {
    Header header = new Header();
    header.addClassNames("bg-base", "border-b", "border-contrast-10", "box-border", "flex", "flex-col", "w-full");

    Div layout = new Div();
    layout.addClassNames("flex", "h-xl", "items-center", "px-l");

    H1 appName = new H1("Akros Marketplace Administration");
    appName.addClassNames("my-0", "me-auto", "text-xl");
    layout.add(appName);

    Nav nav = new Nav();
    nav.addClassNames("flex", "gap-s", "overflow-auto", "px-m");

    // Wrap the links in a list; improves accessibility
    UnorderedList list = new UnorderedList();
    list.addClassNames("flex", "list-none", "m-0", "p-0");
    nav.add(list);

    for (RouterLink link : createLinks()) {
      ListItem item = new ListItem(link);
      list.add(item);
    }

    header.add(layout, nav);

    return header;
  }

  private List<RouterLink> createLinks() {
    List<RouterLink> links = new ArrayList<>();
    links.add(createLink("Categories", CategoryView.class));
    return links;
  }

  private RouterLink createLink(String text, Class<? extends Component> view) {
    RouterLink link = new RouterLink();
    link.addClassNames("flex", "h-m", "items-center", "px-s", "relative", "text-secondary");
    link.setRoute(view);

    Span textSpan = new Span(text);
    textSpan.addClassNames("font-medium", "text-s", "whitespace-nowrap");

    link.add(textSpan);
    return link;
  }

}
