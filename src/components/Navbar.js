import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <Link to="/"><a class="navbar-brand" href="#">PICKKU</a></Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button"        data-bs-toggle="dropdown" aria-expanded="false">
                카테고리
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">버추얼</a></li>
                <li><a class="dropdown-item" href="#">일러스트</a></li>
                <li><a class="dropdown-item" href="#">영상</a></li>
              </ul>
            </li>
            {/* <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>  */}
            <li class="nav-item">
              <a class="nav-link" href="#">고객후기</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">고객센터</a>
            </li>
          </ul>
          <span class="navbar-text">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <Link to="/Login"><li class="nav-item">로그인/회원가입</li></Link>
              
              {/* <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
              </li> */}
            </ul>
          </span>
        </div>
      </div>
    </nav>
    </>
  );
}

export default Navbar;
