import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GlobalCardType } from ".";

const GlobalCard: React.FC<GlobalCardType> = ({
  title,
  description,
  content,
  footer,
}) => {
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{content}</CardContent>
        {footer ?? (
          <CardFooter className="flex justify-between place-items-center">
            {footer}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default GlobalCard;
