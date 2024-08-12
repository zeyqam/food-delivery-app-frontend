import { useGetRestaurant } from "@/api/RestaurantApi";
import { useParams } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import RestaurantInfo from "./RestaurantInfo";
import MenuItem from "./MenuItem";

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  if (isLoading || !restaurant) {
    return "Loading...";
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32 ">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem menuItem={menuItem} />
          ))}
          <RestaurantInfo restaurant={restaurant} />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
