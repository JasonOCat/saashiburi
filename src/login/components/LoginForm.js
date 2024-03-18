
export default function LoginForm() {
  return (
    <form className="content-grid home-hero">
      <h1>Welcome back</h1>
      <div className="email-input">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" autoComplete="email"/>
      </div>
      <button type="submit" className="large-button">
        <div className="large-button-text">
          Login
        </div>
      </button>
    </form>
  )
}
