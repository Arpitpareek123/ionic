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

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const handleLogin = () => {
    // Your login logic goes here
    try {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = { email, password };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        history.push("/home");
    } catch (error) {
        setError('something wen wrong')
    }
  };

  return (
    <IonPage>
      <IonContent className="login-container">
        <IonItem>
          <IonLabel >Email</IonLabel>
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
        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
