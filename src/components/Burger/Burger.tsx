import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import styles from './Burger.module.css';

import { BurgerProps } from 'shared/models/props/burger-props.model';
import { IngredientsTypes } from 'shared/models/props/ingredients-props.model';

const Burger = (props: BurgerProps) => {
  // const transformedIngredients = Object.keys(props.ingredients).map((igKey: string) => {
  //   return [...Array((props.ingredients as any)[igKey])].map((_, index) => (
  //     <BurgerIngredient key={igKey + index} type={igKey as any} />
  //   ));
  // }); maneira desenvolvida pelo professor

  let transformedIngredients: JSX.Element | JSX.Element[] = Object.entries(props.ingredients)
    .map(([ingredient, qtd]) => {
      return Array(qtd)
        .fill(ingredient)
        .map((_, index) => {
          return (
            <BurgerIngredient key={ingredient + index} type={ingredient as IngredientsTypes} />
          );
        });
    })
    .flat();
  // .reduce((arr, el) => {
  //   console.log({ arr, el });
  //   return [...arr, ...el];
  // }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please, start adding ingredients!</p>;
  }

  return (
    <div className={styles['Burger']}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default Burger;
