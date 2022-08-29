import { FC, useEffect, useLayoutEffect } from "react";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ProductStackParamList } from "../App";
import Meal from "../models/meal";
import MealItem from "../components/MealItem";
import { StackNavigationProp } from "@react-navigation/stack";

const MealsOverviewScreen: FC = () => {
  const route = useRoute<RouteProp<ProductStackParamList, "MealsOverview">>();
  const navigation =
    useNavigation<
      StackNavigationProp<ProductStackParamList, "MealsOverview">
    >();

  let currentCategoryId = route.params.categoryId;

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((x) => x.id === currentCategoryId);
    navigation.setOptions({ headerTitle: categoryTitle?.title });
  }, [currentCategoryId, navigation]);

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(currentCategoryId) >= 0;
  });

  const renderMealItem = (meals: ListRenderItemInfo<Meal>) => {
    return (
      <MealItem
        title={meals.item.title}
        imageUri={meals.item.imageUrl}
        duration={meals.item.duration}
        complexity={meals.item.complexity}
        affordability={meals.item.affordability}
        onPress={() => {
          navigation.navigate("MealsDetails", {
            mealId: meals.item.id,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(meal) => meal.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default MealsOverviewScreen;
