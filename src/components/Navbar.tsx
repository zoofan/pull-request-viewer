import {Button} from "@radix-ui/themes";

const Navbar = () => {
  return (
    <nav className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 shadow-md p-4 flex justify-between items-center">
      <div className="text-lg font-bold text-white tracking-wide">MyApp</div>
      <div>
        <Button
          variant="solid"
          className="bg-white text-purple-600 hover:bg-gray-100"
        >
          Sign In
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
