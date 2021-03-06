/* eslint-disable */
import { useTranslation } from 'react-i18next';
import React from 'react';

function SearchResultListItem(props) {
  const { t, i18n } = useTranslation();
  /* istanbul ignore next */
  const listElements = props.results.map((result) => {
    return (
      <li key={result.topic_id} class="sr-ad-block">
        <a
          onClick={() => props.handleClick(result)}
          class="sr-ad-link"
          title={result.topic_values.find((value) => value.key === 'title').value}
        >
          <div class="sr-ad-thumb-block">
            <img
              src="https://media.istockphoto.com/photos/bohemian-living-room-interior-3d-render-picture-id1182454657?k=20&m=1182454657&s=612x612&w=0&h=1xEsm7BqeicA8jYk9KlerUtGsAgzzo530l5Ak1HJdnc="
              class="sr-ad-thumb"
              alt="2 ½ rooms apartment"
            />
            <p class="sr-ad-info">
              <span className="sr-ad-type">
                {result.topic_values.find((value) => value.key === 'title').value}
              </span>
              {
                result.topic_values.find((value) => value.key === 'price') &&
                    <span className="sr-ad-price">
                      {result.topic_values.find((value) => value.key === 'price').value}
                    </span>
              }
              {
                result.topic_values.find((value) => value.key === 'toPrice') &&
                    <span className="sr-ad-price">
                      {result.topic_values.find((value) => value.key === 'toPrice').value}
                    </span>
              }
              <span class="sr-ad-currency"> CHF</span>&nbsp;/&nbsp;
              <span class="sr-ad-per-time">{t(result.topic_values.find((value) => value.key === 'priceUnit').value)}</span>
            </p>
          </div>
          <p class="sr-ad-rooms">
            {t(result.subcategory_key)}
          </p>
          <p class="sr-ad-address">
            <span class="sr-ad-post-code">
              {result.topic_values.find((value) => value.key === 'postalCode').value}&nbsp;
            </span>
            <span class="sr-ad-city">
              {result.topic_values.find((value) => value.key === 'region').value}
            </span>
          </p>
        </a>
      </li>
    );
  });

  return <ul id="search-results-list">{listElements}</ul>;
}

export default SearchResultListItem;
