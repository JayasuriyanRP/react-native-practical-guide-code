import { FC } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import Category from "../models/category";
import CategoryGridTile from "../components/CategoryGridTile";

interface CategoriesScreenProps {}

const renderCategories = (itemData: ListRenderItemInfo<Category>) => {
  return (
    <CategoryGridTile title={itemData.item.title} color={itemData.item.color} />
  );
};

const CategoriesScreen: FC<CategoriesScreenProps> = () => {
  return (
    <FlatList
      data={CATEGORIES}
      renderItem={renderCategories}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  );
};

export default CategoriesScreen;
