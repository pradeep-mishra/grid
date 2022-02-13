
export default function Footer() {
  return (
    <>
      <footer>
        <span className="creator">&copy;Pradeep Mishra</span>
        <span>
          <a target="_blank" href="https://github.com/pradeep-mishra/grid">
            <img src="/github.png" alt="github" />
          </a>
        </span>
        <span>
          <a target="_blank" href="https://www.linkedin.com/in/ipradeepmishra/">
            <img src="/linkedin.png" alt="linkedin" />
          </a>
        </span>
        <span>
          <a target="_blank" href="https://twitter.com/ipradeepmishra">
            <img src="/twitter.png" alt="twitter" />
          </a>
        </span>
      </footer>
      <div class="post-script">
        <span>
          Following functions are supported
        </span>
        <ol>
          <li>
          =sum(1, 2, 3, A2, B5, C2)
        </li>
        <li>
          =eval(js code)
        </li>
        </ol>
      </div>
    </>
  )
}