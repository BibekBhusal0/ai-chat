import { Button } from "@heroui/react";

export default function Info() {
  return (
    <div>
      <Button color="primary" >
        Terms of Use
      </Button>
      <Button color="primary" >
        Privacy Policy
      </Button>
      <Button color="primary" as="a" href="https://github.com/bibekbhusal0/ai-chat">
        GitHub
      </Button>
    </div>
  );
}

