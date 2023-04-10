import  { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonText,
} from '@ionic/react';
import './login.css';
import { useHistory } from 'react-router-dom';
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((user: { email: string; password: string }) => {
      return user.email === email && user.password === password;
    });
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      history.push("/home");
    } else {
      setError("Invalid email or password.");
    }
  };
  const googleLogin=()=>{
    GoogleAuth.signIn().then((e)=>{console.log("Google login",e)}).catch((e)=>{console.log(e)})
  }

  return (
    <IonPage>
      <IonContent className="login-container">
       
      <form className="Auth-form" onSubmit={handleSubmit}>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.target.value as string)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.target.value as string)}
          />
        </IonItem>
        {error && <IonText color="danger">{error}</IonText>}
        <IonButton type="submit">
          Login
        </IonButton>
        </form>
        <IonButton onClick={googleLogin}>google login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
