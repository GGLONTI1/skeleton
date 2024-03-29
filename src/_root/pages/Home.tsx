import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";



interface Recipe {
  title: string,
  image: string,
  time: number,
  description: string,
  vegan: boolean,
  id: string,
}

 // delay response 
await new Promise((resolve) => setTimeout(resolve, 3000))

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:4000/recipes")
        const data = await response.json();

        setRecipes(data)
        console.log(data);
      } catch (error) {
        console.log(error);

      }
    }
    fetchRecipes()
  }, [])
  return <div className="grid grid-cols-3 gap-8">
    {recipes?.map((recipe) => (
      <Card key={recipe.id} className="flex flex-col justify-between">
        <CardHeader className="flex-row gap-4 items-center">
          <Avatar>
            <AvatarImage src={recipe.image} />
            <AvatarFallback>
              {recipe.title.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>
              {recipe.title}
            </CardTitle>
            <CardDescription>
              {recipe.time} mins to cook
            </CardDescription>
          </div>
        </CardHeader >
        <CardContent>
          <p>
            {recipe.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant='secondary'>View Recipe</Button>
          {recipe.vegan && <Badge>Vegan!</Badge>}
        </CardFooter>
      </Card>
    ))}
  </div>;
};

export default Home;
