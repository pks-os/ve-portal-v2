import * as React from 'react';

import { LoadingSpinner } from '@waldur/core/LoadingSpinner';
import { TranslateProps } from '@waldur/i18n';
import { CategoriesListType } from '@waldur/marketplace/types';

import { CategoryCard } from './CategoryCard';

interface CategoriesListProps extends TranslateProps, CategoriesListType {}

export const CategoriesList: React.SFC<CategoriesListProps> = (props: CategoriesListProps) => {
  if (props.loading) {
    return <LoadingSpinner/>;
  }

  if (!props.loaded) {
    return (
      <h3 className="text-center">
        {props.translate('Unable to load marketplace categories.')}
      </h3>
    );
  }

  if (props.loaded && !props.items) {
    return (
      <h3 className="text-center">
        {props.translate('There are no categories in marketplace yet.')}
      </h3>
    );
  }

  return (
    <>
      {props.items.map((category, index) => (
        <div key={index} className="col-md-3 col-sm-6">
          <CategoryCard category={category}/>
        </div>
      ))}
    </>
  );
};
