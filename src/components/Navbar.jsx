import { useAuth } from "../context/AuthContext";
import { useRouter } from "../context/AuthContext";
import { Btn } from "./common";

export function Navbar() {
  const { user, logout } = useAuth();
  const { navigate } = useRouter();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="text-xl font-bold font-serif text-[#1B2B4B]">
          Stay<span className="text-[#E8634A]">Ease</span>
        </button>

        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Btn variant="ghost" size="sm" onClick={() => navigate("/become-host")}>Become a Host</Btn>
              <Btn variant="outline" size="sm" onClick={() => navigate("/login")}>Log In</Btn>
              <Btn variant="primary" size="sm" onClick={() => navigate("/register")}>Sign Up</Btn>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-500 hidden sm:inline">Hi, {user.name?.split(" ")[0]}</span>
              {user.role === "host"
                ? <Btn variant="outline" size="sm" onClick={() => navigate("/host/dashboard")}>My Listings</Btn>
                : <>
                    <Btn variant="ghost" size="sm" onClick={() => navigate("/become-host")}>Become a Host</Btn>
                    <Btn variant="outline" size="sm" onClick={() => navigate("/dashboard")}>My Bookings</Btn>
                  </>
              }
              <Btn variant="outline" size="sm" onClick={() => navigate("/profile")}>Profile</Btn>
              <Btn variant="ghost" size="sm" onClick={() => { logout(); navigate("/"); }}>Log Out</Btn>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
