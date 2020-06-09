import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import styles from './Burger.module.css';

import { BurgerProps } from 'shared/models/burger-props.model';
import { IngredientsTypes } from 'shared/models/ingredients-props.model';

const Burger = (props: BurgerProps) => {
  // const transformedIngredients = Object.keys(props.ingredients).map((igKey: string) => {
  //   return [...Array((props.ingredients as any)[igKey])].map((_, index) => (
  //     <BurgerIngredient key={igKey + index} type={igKey as any} />
  //   ));
  // });

  const transformedIngredients = Object.entries(props.ingredients).map(([ig, qtd]) => {
    return Array(qtd)
      .fill(null)
      .map((_, index) => {
        return <BurgerIngredient key={ig + index} type={ig as IngredientsTypes} />;
      });
  });

  return (
    <div className={styles['Burger']}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default Burger;
