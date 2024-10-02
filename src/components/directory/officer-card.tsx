import { sUser } from "@/lib/types";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone } from "lucide-react";

type Props = {
  o: sUser;
};

function OfficerCard({ o }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {o.firstName} {o.lastName}
        </CardTitle>
        <div className="flex gap-x-2">
          {o.roles?.map((r, idx) => (
            <Badge key={idx}>{r}</Badge>
          ))}
        </div>
      </CardHeader>
      {/* At a glance info */}
      <CardContent className="flex flex-col gap-y-1">
        <p className="flex gap-x-2">
          <Mail /> {o.email}
        </p>
        {o.phone && (
          <p className="flex gap-x-2">
            <Phone /> {o.phone}
          </p>
        )}
      </CardContent>
      {/* Footer action buttons */}
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}

export default OfficerCard;
