import { ref, onMounted} from 'vue'

const isLoggedIn = ref(false);

const checkAuthStatus = (): void => {
  const token: string | null = localStorage.getItem('authToken');
  isLoggedIn.value = !!token;
};


const login = (token: string): void => {
  localStorage.setItem('authToken', token);
  isLoggedIn.value = true;
};

const logout = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('username');
  console.log("dsadsa");
  isLoggedIn.value = false;
};

export function useAuth() {
  onMounted(() => {
    checkAuthStatus();
  });

  return {
    isLoggedIn,
    login,
    logout
  };
}
