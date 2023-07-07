import { ErrorTypes } from '../utils/getUser'
import { ComponentType, useShowComponent } from '../../contexts/Sessions'
import Options from './Options'
import { KeysLocalStorage } from '../../../enum'
function UserTarget() {
  return (
    <div className="userTarget">
      <img className="userTarget__img" src="./user.png" alt="imagen del usuario" loading="lazy" />
      <p className="userTarget__username">Frova</p>
      <button className="button" style={{ height: 'fit-content' }}>
        Cambiar Password
      </button>
    </div>
  )
}
function UserEmpty() {
  const { setShowComponent } = useShowComponent()
  return (
    <>
      <h3>Perfil de Usuario</h3>
      <Options
        title="Iniciar Sesión en la Nube"
        description="Inicia sesión o créate una cuenta para  obtener un backup  y acceder a las herramientas de administrador"
        descriptionAction
        actions={
          <>
            <button onClick={() => setShowComponent(ComponentType.signin)} className="button">
              signIn
            </button>
            <button onClick={() => setShowComponent(ComponentType.signup)} className="button__blue">
              signUp
            </button>
          </>
        }
      />
    </>
  )
}

function UserValid() {
  const { setShowComponent } = useShowComponent()
  return (
    <>
      <h3 className="user__title">Perfil de Usuario</h3>
      <UserTarget />
      <div className="user__options--rigth">
        <button
          className="button"
          onClick={() => {
            window.localStorage.removeItem(KeysLocalStorage.token)
            setShowComponent(ComponentType.signin)
          }}
        >
          Cerrar Sesión
        </button>
        <button onClick={() => setShowComponent(ComponentType.signin)} className="button__blue">
          Cambiar De Usuario
        </button>
        <button className="button__red">Eliminar Usuario</button>
      </div>
    </>
  )
}
export default function index({ error }: { data: any; error: ErrorTypes | undefined }) {
  const { setShowComponent } = useShowComponent()
  if (error === ErrorTypes.tokenNotFound) {
    return <UserEmpty />
  }
  if (error === ErrorTypes.tokenInvalid) {
    return (
      <>
        tokenInvalid
        <button onClick={() => setShowComponent(ComponentType.signin)}>Iniciar Sesion</button>
      </>
    )
  }
  if (error === ErrorTypes.requestError) {
    return <>requestError</>
  }
  return <UserValid />
}