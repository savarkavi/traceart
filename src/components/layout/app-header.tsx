import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

const AppHeader = () => {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-3">
        <p className="text-2xl font-bold">TraceArt</p>
        <Show when="signed-out">
          <div className="flex items-center gap-4">
            <SignInButton>
              <Button className="px-6 py-4 font-semibold" variant="outline">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="px-6 py-4 font-semibold">Sign Up</Button>
            </SignUpButton>
          </div>
        </Show>
        <Show when="signed-in">
          <UserButton
            appearance={{
              elements: {
                userButtonBox: {
                  width: "2.3rem",
                  height: "2.3rem",
                },
                userButtonAvatarBox: {
                  width: "100%",
                  height: "100%",
                },
              },
            }}
          />
        </Show>
      </div>
    </header>
  );
};

export default AppHeader;
