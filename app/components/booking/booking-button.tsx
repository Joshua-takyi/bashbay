import { Button } from "@heroui/button";

interface BookingButtonProps {
  isDisabled: boolean;
  onClick: () => void;
}

export default function BookingButton({
  isDisabled,
  onClick,
}: BookingButtonProps) {
  return (
    <>
      <Button
        color="primary"
        size="lg"
        className="w-full font-semibold"
        isDisabled={isDisabled}
        onPress={onClick}
      >
        Book now
      </Button>
      <p className="small text-center text-default-400">
        You won't be charged yet
      </p>
    </>
  );
}
