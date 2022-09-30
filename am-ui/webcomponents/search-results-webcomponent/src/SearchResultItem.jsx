/* eslint-disable */
import {useTranslation} from 'react-i18next';
import React from 'react';

function SearchResultListItem(props) {
  const { t } = useTranslation();
  /* istanbul ignore next */

  const createImageFromProps = (images) => {
    const thumbnail = images.find((e) => e.thumbnail);
    return thumbnail ?
      `data:image/jpeg;base64,${thumbnail.value}` :
      'https://media.istockphoto.com/photos/bohemian-living-room-interior-3d-render-picture-id1182454657?k=20&m=1182454657&s=612x612&w=0&h=1xEsm7BqeicA8jYk9KlerUtGsAgzzo530l5Ak1HJdnc=';
  }

  const listElements = props.results.map((result) => {
    return (
      <li key={result.topic_id} className="sr-ad-block">
        <a
          onClick={() => props.handleClick(result)}
          className="sr-ad-link"
          title={result.topic_values.find((value) => value.key === 'title').value}
        >
          <div className="sr-ad-thumb-block">
            <img
              src={createImageFromProps(result.topic_images)}
              className="sr-ad-thumb"
              alt="2 ½ rooms apartment"
            />
            <p className="sr-ad-info">
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
              <span className="sr-ad-currency"> CHF</span>&nbsp;/&nbsp;
              <span
                className="sr-ad-per-time">{t(result.topic_values.find((value) => value.key === 'priceUnit').value)}</span>
            </p>
          </div>
          <p className="sr-ad-rooms">
            {t(result.subcategory_key)}
          </p>
          <p className="sr-ad-address">
            <span className="sr-ad-post-code">
              {result.topic_values.find((value) => value.key === 'postalCode').value}&nbsp;
            </span>
            <span className="sr-ad-city">
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
