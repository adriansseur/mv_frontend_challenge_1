import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, validate } from "./actions"
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Form, Accordion } from "react-bootstrap"
import bgVideo from "./media/production ID_3945149.mp4"
import gsap from "gsap";
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

function App() {
  const balance = useSelector(state => state.balance)
  const isValid = useSelector(state => state.isValid)
  const dispatch = useDispatch()
  const riderHead = React.useRef()
  const riderRightArm = React.useRef()
  const riderLeftArm = React.useRef()
  const coin = React.useRef()
  const dtl = gsap.timeline({ defaults: { duration: 1, ease: "power3.inOut" } })
  const wtl = gsap.timeline({ defaults: { duration: 0.5, ease: "power3.inOut" } })

  function processInput(e) {
    // only numbers and decimals, limit 2 decimals, no commas, no currency symbols
    const regex = /^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/
    if (e.target.value && regex.test(e.target.value)) {
      const inputNum = parseFloat(parseFloat(e.target.value).toFixed(2))
      dispatch(validate(inputNum))
    } else {
      dispatch(validate(0))
    }
  }

  function handleDeposit() {
    dispatch(increment(isValid))
    // deposit animation
    gsap.set(riderRightArm.current, { transformOrigin: "left", zIndex: 10 })
    gsap.set(coin.current, {transformOrigin: "center"})
    dtl.to(riderRightArm.current, { rotate: 50 })
      .fromTo(coin.current, {scale: 1}, { y: 150, scale: 0}, "<")
      .to(riderRightArm.current, { rotate: -90 })
      .to(riderLeftArm.current, {rotate: -40}, "<")
      .to(riderRightArm.current, { rotate: 0 })
      .to(riderLeftArm.current, { rotate: 0 }, "<")
      .fromTo(coin.current, { y: 0, scale: 0 }, { scale: 1, opacity: 1 }, "<")
  }

  function handleWithdraw() {
    dispatch(decrement(isValid))
    // withdraw animation
    gsap.set(riderLeftArm.current, { transformOrigin: "left" })
    gsap.set(riderRightArm.current, { transformOrigin: "left" })
    gsap.set(coin.current, { transformOrigin: "center" })
    gsap.set(riderHead.current, { transformOrigin: "bottom center" })
    wtl.to(riderLeftArm.current, { rotate: -30 })
      .to(coin.current, { y: -215, x: -145 }, "<")
      .to(coin.current, { scale: 0 }, "<50%")
      .to(riderRightArm.current, { rotate: 90 })
      .to(riderLeftArm.current, { rotate: 80 }, "<80%")
      .to(riderHead.current, { rotate: 30 })
      .to(riderHead.current, { rotate: 0 })
      .to(riderLeftArm.current, { rotate: 0 }, "<")
      .to(riderRightArm.current, { rotate: 0 }, "<")
      .fromTo(coin.current, { y: 0, x: 0 }, { scale: 1 }, "<")
  }
  
  // renders button that proceeds with transaction and toggles accordion
  function ProceedAndToggle({ children, eventKey, purpose }) {
    const proceedActions = useAccordionButton(eventKey, () => {
      if (purpose === "deposit") {
        handleDeposit()
      } else if (purpose === "withdraw") {
        handleWithdraw()
      }
    })

    return (
      <Button className="w-100" onClick={() => {
        if (isValid) {
          proceedActions()
        }
      }}>{children}</Button>
    )
  }

  return (
    // background
    <div id="page-container" className="bg-opacity-25 vh-100 d-flex justify-content-center align-items-center">
      <video id="bg-video" src={bgVideo} autoPlay muted loop playsInline></video>

      {/* white container */}
      <div id="main-container" className="bg-white bg-opacity-75 container w-75 pt-5 pe-4 pb-5 ps-4">

        {/* balance container */}
        <div className="container mb-5">
          <div className="row">
            <div className="col ps-0 d-flex align-items-center">
              <h1 className="mb-0">Balance: <br/>${parseFloat(balance).toFixed(2)}</h1>
            </div>
            <div className="col pe-0">
              <svg id="piggy-bank" className="mw-100" fill="none" viewBox="0 0 741 598" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#a)">
                <g ref={riderHead} className="rider-head">
              <path d="m153.19 131.86c28.167 0 51-22.833 51-51 0-28.166-22.833-51-51-51s-51 22.834-51 51c0 28.167 22.833 51 51 51z" fill="#57BD3E"/>
              <path d="m182.07 94.05c1.63-0.5701 3.119-1.4826 4.367-2.6761 0.825-0.8509 1.455-1.8721 1.845-2.992 0.389-1.1199 0.529-2.3113 0.41-3.491-0.07-0.8408-0.333-1.6541-0.768-2.3765-0.436-0.7223-1.033-1.3342-1.744-1.7876-1.846-1.135-4.285-1.0922-6.747 0.0493l-0.285-19.908-1.999 0.0285 0.334 23.404 1.522-0.9985c1.765-1.1559 4.302-1.9941 6.127-0.8716 0.451 0.2972 0.828 0.6945 1.1 1.1609 0.273 0.4665 0.435 0.9896 0.472 1.5286 0.085 0.8789-0.022 1.7655-0.311 2.5996s-0.755 1.5961-1.365 2.2342c-2.168 2.1511-5.377 2.8719-9.039 3.5311l0.354 1.968c1.947-0.2956 3.864-0.7651 5.727-1.4029z" fill="#2F2E41"/>
              <path d="m199.74 59.472-10.651 1.6129 0.299 1.9773 10.651-1.613-0.299-1.9772z" fill="#2F2E41"/>
              <path d="m166.12 64.563-10.651 1.6129 0.3 1.9773 10.65-1.613-0.299-1.9772z" fill="#2F2E41"/>
              <path d="m152.61 46.94c6.709-5.7703 15.923-0.6084 23.617-1.512 7.361-0.8646 13.174-7.4675 14.659-14.482 1.732-8.184-2.515-16.383-8.777-21.486-6.857-5.5886-15.952-7.1929-24.57-6.159-9.877 1.185-18.911 5.7894-27.017 11.359-7.824 5.209-15.019 11.306-21.442 18.169-5.751 6.3517-10.624 13.923-12.18 22.47-1.414 7.7675-0.3343 16.375 4.2576 22.955 2.435 3.3726 5.698 6.0608 9.474 7.8053 3.938 1.9334 8.138 3.3156 11.952 5.5017 5.768 3.3053 11.374 10.159 9.567 17.291-0.387 1.558-1.152 2.997-2.226 4.19-1.291 1.433-3.619-0.461-2.325-1.897 2.273-2.523 2.184-5.888 0.972-8.9-1.44-3.3947-3.99-6.1994-7.233-7.9546-3.993-2.2829-8.402-3.6921-12.494-5.7716-3.917-1.8996-7.318-4.7175-9.9116-8.2138-4.8982-6.807-6.3633-15.666-5.2524-23.861 1.2021-8.8684 5.7587-16.927 11.471-23.68 6.216-7.3494 13.852-13.571 21.652-19.159 8.37-5.9968 17.617-11.067 27.85-12.9 8.87-1.5895 18.485-0.61091 26.241 4.2229 7.24 4.5121 12.792 12.274 13.344 20.947 0.198 3.9461-0.659 7.8738-2.482 11.379-1.824 3.5051-4.549 6.4609-7.894 8.5632-3.433 2.0542-7.424 2.9787-11.41 2.6433-4.262-0.2728-8.527-1.5778-12.816-1.2155-1.941 0.1178-3.79 0.865-5.268 2.1285-1.466 1.2607-3.213-1.1807-1.759-2.4311v-0.0021z" fill="#2F2E41"/>
                                </g>
              <g fill="#F6F6F6">
              <path d="m538 395.5c0 91.403-83.723 156-187 156s-187-64.597-187-156 83.723-165.5 187-165.5c48.784 0 97.205 12.42 130.5 39.5 37.191 30.249 56.5 77.772 56.5 126z"/>
              <path d="m469.5 197-46 45 61.5 31v-74.5l-14.5 13-1-14.5z"/>
              <path d="m246.5 573v-47l46 18v29l-1 4-2.5 5-3 4.5-4.5 3.5-6 2.5-6 1-6.5-1-5.5-2.5-5-4.5-3.5-4.5-2.5-8z"/>
              <path d="m447 574v-47l-46 18v29l1 4 2.5 5 3 4.5 4.5 3.5 6 2.5 6 1 6.5-1 5.5-2.5 5-4.5 3.5-4.5 2.5-8z"/>
              </g>
              <path d="m421.95 528.31c-5.122-7.172-12.055-12.419-20.771-14.383-7.601-1.713-15.416-1.421-23.142-1.361l-97.692 0.753c-8.367 0.065-16.389 7.313-16 16 0.386 8.614 7.032 16.069 16 16 28.617-0.22 57.234-0.441 85.851-0.662 6.747-0.052 13.497-0.174 20.244-0.151 1.515 5e-3 3.024 0.084 4.538 0.102 0.366 4e-3 0.631 1e-3 0.818-7e-3 0.047 0.014 0.086 0.027 0.147 0.044 0.79 0.216 1.6 0.366 2.394 0.572-0.278 8e-3 0.516 0.503 0.914 0.671 0.055 0.108 0.171 0.299 0.366 0.595 0.272 0.51 1.077 2.059 1.111 2.01 1.209 3.059 2.207 6.197 2.986 9.393 1.86 7.047 2.268 8.52 2.536 15.132 0.338 8.352 7.117 16.398 16 16 8.379-0.376 16.363-7.043 16-16-0.611-15.094-3.261-32.05-12.3-44.708z" fill="#E6E6E6"/>
              <path d="m286.09 564.41c-1.835-11.12-3.635-22.246-5.505-33.36-1.898-11.274-5.775-21.598-14.548-28.998-2.345-1.977-4.775-3.823-7.216-5.663-0.859-0.647-1.716-1.294-2.564-1.956-0.05-0.039-0.083-0.064-0.127-0.098-0.093-0.08-0.205-0.176-0.355-0.303-3.657-3.095-7.19-6.327-10.556-9.763-2.989-3.052-5.847-6.233-8.575-9.545-0.682-0.827-1.354-1.662-2.018-2.504-0.115-0.145-0.73-0.94-1.135-1.459-0.377-0.519-1.066-1.457-1.182-1.62-0.776-1.097-1.538-2.205-2.286-3.322-5.096-7.635-9.509-15.705-13.187-24.115-0.365-0.834-0.721-1.673-1.068-2.517-0.094-0.258-0.214-0.589-0.374-1.029-0.742-2.038-1.481-4.074-2.159-6.137-1.44-4.38-2.678-8.826-3.714-13.336-0.512-2.227-0.973-4.465-1.383-6.715-0.212-1.157-0.409-2.316-0.594-3.477-0.03-0.193-0.21-1.447-0.315-2.155-0.079-0.711-0.224-1.971-0.244-2.166-0.117-1.171-0.221-2.343-0.312-3.516-0.204-2.64-0.343-5.285-0.415-7.934-0.123-4.707-0.038-9.415 0.253-14.122 0.166-2.645 0.403-5.282 0.694-7.915 0.017-0.162 0.031-0.291 0.044-0.407 0.017-0.117 0.038-0.251 0.062-0.417 0.215-1.455 0.442-2.908 0.695-4.356 0.96-5.5 2.208-10.945 3.74-16.313 0.725-2.539 1.512-5.058 2.363-7.556 0.378-1.109 0.769-2.213 1.172-3.314-0.026 0.071 1.182-3.015 1.199-3.119 4.794-11.329 12.638-21.657 12.648-34.526 7e-3 -8.713-7.365-17.06-16-16.657-4.306 0.162-8.381 1.989-11.365 5.097-2.985 3.107-4.647 7.252-4.635 11.56 0 0.196-1e-3 0.363-2e-3 0.525-0.081 0.271-0.148 0.497-0.208 0.697-0.935 2.032-2.081 3.963-3.107 5.945-2.811 5.423-5.21 11.025-7.489 16.708-3.73 9.255-6.586 18.84-8.529 28.628-4.223 21.446-4.551 43.477-0.968 65.04 6.204 37.813 26.662 74.009 55.103 98.339 2.469 2.111 4.997 4.152 7.549 6.151 1.056 0.827 2.121 1.639 3.192 2.446 0.505 0.381 2.601 2.034 1.679 1.233 1.983 1.692 2.817 2.543 3.326 3.789 0.074 0.288 0.175 0.678 0.311 1.211 0.359 1.406 0.7 2.808 0.983 4.233 2.475 12.451 4.196 25.112 6.264 37.644 1.421 8.61 12.022 14.215 19.682 11.634 8.916-3.004 12.698-11.264 11.175-20.491l1e-3 1e-3z" fill="#E6E6E6"/>
                                <path d="m423.57 596.71c-6.72 0.018-13.172-2.631-17.941-7.365-4.769-4.733-7.466-11.165-7.499-17.885v-18.251c-19.109 2.139-84.543 1.644-103.3-1.37v18.892c-0.059 6.708-2.766 13.121-7.53 17.843-4.765 4.723-11.202 7.372-17.91 7.372s-13.145-2.649-17.91-7.372c-4.764-4.722-7.471-11.135-7.53-17.843v-37.092c-25.404-14.113-46.582-34.75-61.349-59.781-14.766-25.03-22.585-53.548-22.651-82.609 0-49.83 22.583-96.314 61.959-127.53 25.602-20.368 56.708-32.616 89.323-35.173 4.427-0.347 8.881-0.523 13.239-0.523 15.352 0 84.619 2.372 102 7.372l39.628-39.322c0.583-0.586 1.327-0.986 2.137-1.147s1.65-0.078 2.413 0.24c0.769 0.306 1.427 0.837 1.888 1.523 0.461 0.687 0.704 1.496 0.696 2.324v6.251l7.717-7.642c0.581-0.586 1.324-0.986 2.134-1.148 0.81-0.161 1.65-0.078 2.412 0.24 0.769 0.306 1.428 0.837 1.89 1.524 0.462 0.686 0.705 1.497 0.698 2.324v69.865c19.885 17.927 35.041 40.482 44.125 65.666 9.084 25.185 11.814 52.222 7.95 78.714-3.864 26.493-14.203 51.623-30.102 73.164s-36.866 38.827-61.043 50.326v33.169c-0.033 6.72-2.73 13.152-7.499 17.886-4.77 4.733-11.222 7.382-17.941 7.364l-4e-3 -6e-3zm-23.44-45.77v20.52c0.057 6.179 2.552 12.086 6.941 16.435 4.39 4.349 10.32 6.789 16.499 6.789s12.109-2.44 16.499-6.789c4.389-4.349 6.884-10.256 6.941-16.435v-34.433l0.571-0.271c27.128-12.873 50.157-33.012 66.531-58.182 20.864-32.119 29.541-70.645 24.46-108.61s-23.583-72.851-52.159-98.353l-0.332-0.298v-70.757c7e-3 -0.43-0.118-0.852-0.358-1.209s-0.583-0.631-0.984-0.787c-0.398-0.17-0.839-0.216-1.264-0.132-0.425 0.085-0.814 0.295-1.117 0.605l-11.128 11.02v-11.048c8e-3 -0.43-0.117-0.851-0.357-1.208s-0.583-0.632-0.984-0.787c-0.4-0.17-0.841-0.216-1.267-0.131-0.425 0.085-0.815 0.297-1.118 0.607l-40.477 40.164-0.575-0.18c-16.156-5.057-86.513-7.454-101.98-7.454-4.306 0-8.707 0.174-13.082 0.517-32.218 2.525-62.946 14.626-88.237 34.746-38.895 30.838-61.202 76.751-61.202 125.97 0.067 28.803 7.845 57.063 22.526 81.844s35.729 45.18 60.958 59.076l0.516 0.286v38.27c0.057 6.179 2.552 12.086 6.942 16.435 4.389 4.349 10.319 6.789 16.498 6.789 6.18 0 12.109-2.44 16.499-6.789 4.389-4.349 6.884-10.256 6.941-16.435v-21.286l1.185 0.222c16.856 3.172 87.832 3.672 104.98 1.422l1.134-0.146z" fill="#3F3D56" />
                  <g ref={riderLeftArm} className="rider-left-arm">
                                  <path d="M288 119.12L177.26 152.4C175.514 152.925 173.889 153.788 172.476 154.941C171.064 156.094 169.893 157.513 169.029 159.119C168.166 160.725 167.627 162.484 167.443 164.298C167.26 166.112 167.435 167.944 167.96 169.69C168.485 171.436 169.348 173.061 170.501 174.474C171.654 175.886 173.074 177.057 174.679 177.921C176.285 178.785 178.044 179.323 179.858 179.507C181.672 179.69 183.504 179.515 185.25 178.99L284.191 149.25C284.018 149.423 284.214 148.656 284.191 149.25C284.773 148.663 286.331 148.853 287 148.5C289.615 147.119 293.714 148.892 297.5 142C296.867 141.715 291.172 118.93 290.48 118.87C289.645 118.789 288.802 118.874 288 119.12Z" fill="#57BD3E"/>
              <path d="M183.34 186.09C181.87 186.086 180.438 185.621 179.247 184.759C178.056 183.898 177.166 182.684 176.702 181.289L169.777 160.393C169.488 159.52 169.374 158.599 169.44 157.682C169.507 156.765 169.754 155.871 170.166 155.049C170.579 154.227 171.15 153.495 171.845 152.894C172.541 152.293 173.348 151.835 174.221 151.546L264.352 121.676C265.224 121.387 266.145 121.272 267.062 121.339C267.979 121.406 268.873 121.652 269.695 122.065C270.516 122.477 271.249 123.047 271.85 123.743C272.451 124.438 272.909 125.245 273.198 126.118L280.123 147.014C280.699 148.733 280.584 150.608 279.801 152.243C279.018 153.878 277.63 155.144 275.93 155.773C275.847 155.804 275.763 155.834 275.678 155.862L185.549 185.731C184.837 185.968 184.091 186.089 183.34 186.09Z" fill="#2F2E41"/>
                                </g>
                  <g ref={coin} className="coin">
                                <path d="m352.13 82.01c-18.191 7e-3 -35.666 7.0922-48.725 19.756-13.059 12.663-20.679 29.912-21.245 48.094-0.02 0.71-0.03 1.43-0.03 2.15 0 13.845 4.105 27.378 11.797 38.89 7.692 11.511 18.624 20.483 31.415 25.782 12.791 5.298 26.866 6.684 40.444 3.983 13.579-2.701 26.052-9.368 35.841-19.158 9.79-9.789 16.457-22.262 19.158-35.841 2.701-13.578 1.315-27.653-3.983-40.444-5.299-12.791-14.271-23.723-25.782-31.415-11.512-7.6917-25.045-11.797-38.89-11.797zm0 138c-18.029-0.019-35.314-7.189-48.063-19.937-12.748-12.749-19.918-30.034-19.937-48.063 0-0.93 0.02-1.85 0.06-2.76 0.542-13.32 4.987-26.187 12.782-37.002 7.796-10.814 18.599-19.098 31.065-23.822s26.046-5.6792 39.05-2.7472c13.005 2.9321 24.861 9.6222 34.094 19.238 9.233 9.617 15.436 21.735 17.837 34.848s0.894 26.643-4.332 38.907c-5.227 12.264-13.943 22.721-25.065 30.07-11.123 7.35-24.16 11.268-37.491 11.268z" fill="#3F3D56" />
              <path d="m411.13 152.01c0 15.648-6.216 30.655-17.281 41.719-11.064 11.065-26.071 17.281-41.719 17.281s-30.655-6.216-41.719-17.281c-11.065-11.064-17.281-26.071-17.281-41.719 0-1.87 0.09-3.71 0.26-5.53 1.422-15.102 8.605-29.076 20.059-39.02 11.453-9.9451 26.297-15.096 41.449-14.385 15.152 0.7117 29.447 7.2318 39.919 18.206 10.471 10.975 16.313 25.56 16.313 40.729z" fill="#E6E6E6"/>
              <path d="m369.7 155.93c-1.43-1.88-3.311-3.37-5.47-4.33-2.662-1.122-5.411-2.025-8.22-2.7v-16.06c4.318 0.651 8.367 2.497 11.69 5.33l3.26-6.95c-1.875-1.67-4.027-3-6.36-3.93-2.586-1.047-5.3-1.743-8.07-2.07v-8.14h-7.55v8.22c-2.915 0.327-5.727 1.272-8.25 2.77-2.278 1.349-4.196 3.229-5.59 5.48-1.33 2.197-2.019 4.722-1.99 7.29-0.129 2.783 0.677 5.529 2.29 7.8 1.486 1.966 3.447 3.522 5.7 4.52 2.705 1.155 5.501 2.082 8.361 2.77v15.39c-5.096-0.384-9.95-2.321-13.911-5.55l-3.259 6.96c2.214 1.831 4.732 3.259 7.44 4.22 2.966 1.062 6.066 1.708 9.21 1.92v8.07h7.549v-8.22c4.194-0.458 8.127-2.261 11.211-5.14 1.358-1.302 2.43-2.873 3.15-4.611 0.719-1.739 1.07-3.608 1.03-5.489 0.125-2.694-0.657-5.353-2.221-7.55zm-20.2-8.73c-1.839-0.558-3.549-1.476-5.03-2.7-0.587-0.522-1.051-1.168-1.359-1.89-0.307-0.723-0.451-1.505-0.421-2.29-0.055-1.781 0.6-3.511 1.82-4.81 1.352-1.363 3.097-2.268 4.99-2.59v14.28zm11.25 21.28c-1.276 1.308-2.937 2.174-4.74 2.47v-13.24c1.723 0.462 3.336 1.269 4.74 2.37 0.532 0.455 0.955 1.023 1.237 1.664 0.283 0.64 0.417 1.336 0.393 2.036 0.069 1.716-0.513 3.395-1.63 4.7z" fill="#57BD3E"/>
              </g>
              <path d="m186.55 270.77c-1.546-3e-3 -3.048-0.515-4.273-1.458s-2.104-2.264-2.502-3.758l-3.77-14.27c-0.472-1.793-0.213-3.701 0.719-5.304 0.933-1.603 2.464-2.771 4.256-3.247l118.94-31.43c1.795-0.468 3.702-0.207 5.305 0.727 1.602 0.935 2.769 2.466 3.246 4.258l3.194 12.09-0.599 0.047c-30.504 2.371-59.691 13.431-84.108 31.871l-0.173 0.084-38.46 10.16c-0.58 0.153-1.177 0.23-1.776 0.23h1e-3z" fill="#2F2E41"/>
              <path d="m166.85 341.26c-13.952-2.061-27.296-7.107-39.122-14.792-5.859-3.805-11.283-8.241-16.174-13.228-4.828-4.924-9.446-10.521-11.838-17.079-2.3007-6.067-2.1821-12.787 0.331-18.769 2.479-5.946 7.215-10.666 13.169-13.126 5.99-2.389 13.226-2.644 19.055-0.028 2.778 1.217 5.182 3.152 6.965 5.606 0.828 1.131 1.442 2.405 1.81 3.758 0.341 1.226 0.372 2.518 0.09 3.759-0.342 1.239-0.944 2.391-1.768 3.378-0.823 0.987-1.848 1.786-3.006 2.345-2.548 1.307-5.308 2.149-8.152 2.486-2.86 0.39-6.968 0.745-9.268-1.551-0.473-0.454-0.845-1.003-1.092-1.611-0.173-0.465-0.232-0.965-0.173-1.458-0.033 0.218 0.139-0.472 0.129-0.445-0.036 0.102-0.194 0.351 0.03-0.031 0.07-0.126 0.148-0.247 0.233-0.363-0.076 0.098-0.243 0.262 0.055-0.019 0.247-0.27 0.563-0.465 0.915-0.564 0.138-0.041 0.279-0.073 0.417-0.111 0.353-0.096-0.351 5e-3 0.01-6e-3 0.139-5e-3 0.28-1e-3 0.419-7e-3 0.354-0.016-0.35-0.097-0.01-0.012 0.131 0.034 0.262 0.066 0.392 0.107 0.282 0.089-0.2-0.207-9e-3 0.014 0.224 0.26-0.235-0.252 0.019-1e-3 0.127 0.124 0.247 0.256 0.358 0.394 0.442 0.436 1.037 0.681 1.658 0.681 0.62 0 1.216-0.245 1.657-0.681 0.427-0.446 0.665-1.04 0.665-1.657 0-0.618-0.238-1.211-0.665-1.658-2.311-2.865-6.877-2.157-9.215 0.265-2.982 3.088-1.801 7.983 1.099 10.678 3.284 3.05 7.935 3.262 12.158 2.751 3.57-0.342 7.049-1.325 10.269-2.902 3.2-1.573 5.703-4.277 7.024-7.588 0.597-1.768 0.811-3.642 0.629-5.498-0.182-1.857-0.757-3.654-1.685-5.271-3.729-7.012-11.452-10.606-19.084-11.228-3.93-0.308-7.882 0.166-11.627 1.396-3.745 1.229-7.209 3.189-10.192 5.766-5.7491 5.176-9.2892 12.363-9.8883 20.075-0.6663 7.996 2.4361 15.761 6.9593 22.214 4.735 6.557 10.385 12.401 16.779 17.353 12.499 9.98 27.161 16.894 42.812 20.191 1.861 0.385 3.733 0.714 5.615 0.988 0.598 0.145 1.23 0.056 1.765-0.248 0.536-0.304 0.936-0.801 1.118-1.389 0.161-0.6 0.079-1.238-0.227-1.778-0.307-0.539-0.813-0.937-1.41-1.106h1e-3z" fill="#3F3D56"/>
              <path d="m379.33 230.13c-20.442-0.289-40.82 0.23-61.133 1.556-6.943 0.453-12.951 2.907-12.951 7.032 0 3.448 5.96 7.488 12.951 7.032 20.303-1.326 40.68-1.845 61.133-1.556 16.674 0.235 16.664-13.829 0-14.064z" fill="#ccc"/>
              <path d="m349.11 243.5c-2.209 0-54.106-0.082-54.106-7.251 0-7.168 51.896-7.25 54.106-7.25s54.106 0.083 54.106 7.25c0 7.169-51.896 7.251-54.106 7.251zm-52.076-7.251c1.42 2.174 20.496 5.251 52.076 5.251s50.656-3.077 52.076-5.251c-1.42-2.172-20.496-5.25-52.076-5.25s-50.656 3.078-52.076 5.25z" fill="#3F3D56"/>
              <path d="m524.68 441.2c11.488-0.319 25.786-0.718 36.801-8.764 3.28-2.494 5.975-5.675 7.896-9.321 1.921-3.645 3.022-7.667 3.225-11.782 0.225-6.355-2.071-11.901-6.465-15.614-5.753-4.861-14.154-6.002-23.207-3.341l9.38-68.548-6.886-0.944-11.027 80.587 5.751-2.638c6.666-3.058 15.817-4.614 21.504 0.192 1.396 1.256 2.484 2.817 3.179 4.562 0.694 1.745 0.977 3.627 0.826 5.5-0.168 3.063-0.995 6.054-2.422 8.769-1.428 2.715-3.424 5.091-5.853 6.966-8.572 6.261-19.969 7.068-32.895 7.43l0.193 6.946z" fill="#3F3D56"/>
              <path d="m505.63 329.74h-37.432v6.95h37.432v-6.95z" fill="#3F3D56"/>
                                <path d="m203.49 302.74c-1.666-5e-3 -3.276-0.604-4.541-1.688s-2.103-2.584-2.363-4.229l-2.285-14.582c-0.285-1.834 0.169-3.707 1.262-5.206 1.093-1.5 2.737-2.505 4.57-2.794l121.53-19.042c1.834-0.285 3.706 0.169 5.206 1.262s2.504 2.737 2.793 4.57l2.285 14.582c0.286 1.834-0.168 3.706-1.261 5.206-1.094 1.5-2.737 2.504-4.571 2.793l-121.53 19.043c-0.362 0.056-0.728 0.085-1.095 0.085z" fill="#2F2E41" />
              <path d="m186.89 301.85c-1.834-4e-3 -3.624-0.566-5.13-1.612-1.507-1.046-2.659-2.526-3.304-4.243l-35.163-94.169c-4.298-11.549-3.839-24.332 1.276-35.543s14.468-19.935 26.008-24.259l28.592-10.676c1.105-0.416 2.282-0.608 3.462-0.568 1.181 0.041 2.342 0.315 3.416 0.807 1.071 0.478 2.036 1.166 2.839 2.022s1.427 1.864 1.836 2.964l65.136 122.98c0.423 1.109 0.622 2.29 0.587 3.477-0.036 1.186-0.306 2.353-0.794 3.435-0.489 1.082-1.186 2.056-2.053 2.867s-1.885 1.443-2.997 1.859l-80.566 30.084c-1.005 0.377-2.071 0.57-3.145 0.571v4e-3z" fill="#2F2E41"/>
              <path d="m190.5 134.58 64.629 86.426-43.732-85.519c-0.361-0.998-0.915-1.915-1.631-2.698-0.716-0.784-1.579-1.419-2.54-1.869s-2.001-0.706-3.061-0.754-2.119 0.113-3.117 0.475l-10.548 3.939z" fill="#E6E6E6" />
                  <g ref={riderRightArm} className="rider-right-arm">
              <path d="m292.83 200.22-115.4-7.433c-1.819-0.117-3.597-0.592-5.232-1.396-1.636-0.804-3.097-1.923-4.3-3.292-1.204-1.369-2.126-2.961-2.713-4.686-0.588-1.726-0.831-3.55-0.713-5.369 0.117-1.819 0.591-3.597 1.395-5.232 0.805-1.636 1.923-3.097 3.292-4.3 1.369-1.204 2.962-2.125 4.687-2.713s3.549-0.83 5.368-0.713l115.4 7.432c0.852 0.055 1.685 0.277 2.451 0.654s1.45 0.9 2.014 1.542c0.563 0.641 0.995 1.387 1.27 2.194 0.275 0.808 0.389 1.663 0.334 2.515l-0.949 14.729c-0.11 1.72-0.9 3.326-2.195 4.464s-2.989 1.715-4.709 1.604z" fill="#57BD3E"/>
              <path d="m262 204.99c-0.152 0-0.305-5e-3 -0.458-0.015l-94.757-6.103c-0.917-0.059-1.814-0.298-2.639-0.704-0.824-0.405-1.561-0.97-2.168-1.66s-1.072-1.494-1.369-2.364c-0.296-0.87-0.418-1.79-0.359-2.707l1.62-25.158c0.059-0.918 0.299-1.814 0.704-2.639 0.406-0.825 0.97-1.562 1.661-2.169 0.69-0.607 1.493-1.072 2.364-1.368 0.87-0.297 1.79-0.419 2.707-0.359l94.756 6.103c1.852 0.121 3.58 0.972 4.805 2.366 1.226 1.394 1.848 3.217 1.731 5.069l-1.62 25.159c-0.09 1.348-0.566 2.641-1.373 3.725-0.806 1.084-1.908 1.912-3.174 2.385-0.777 0.291-1.601 0.44-2.431 0.439z" fill="#2F2E41"/>
              </g>
                  <path d="m739.49 597.18h-738.29c-0.3158 0-0.61865-0.125-0.84195-0.349-0.2233-0.223-0.34875-0.526-0.34875-0.842 0-0.315 0.12546-0.618 0.34875-0.842 0.2233-0.223 0.52616-0.348 0.84195-0.348h738.29c0.316 0 0.619 0.125 0.842 0.348 0.223 0.224 0.349 0.527 0.349 0.842 0 0.316-0.126 0.619-0.349 0.842-0.223 0.224-0.526 0.349-0.842 0.349z" fill="#3F3D56" />
              </g>
              <defs>
              <clipPath id="a">
              <rect width="740.68" height="597.18" fill="#fff"/>
              </clipPath>
              </defs>
              </svg>
            </div>
          </div>
          
        </div>

        {/* Deposit / Withdraw Accordion */}
        <Accordion>

          <Accordion.Item eventKey="0">
            <Accordion.Header>Deposit</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group className="mb-3" controlId="depositContainer">
                  <Form.Label>Enter Amount:</Form.Label>
                  <div className="row">
                    <div className="col pe-0">
                      <Form.Control className="" onChange={processInput} type="text" />
                    </div>
                    <div className="col ps-0">
                      <ProceedAndToggle purpose="deposit" eventKey="0">Deposit</ProceedAndToggle>
                    </div>
                  </div>
                </Form.Group>
              </Form>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Withdraw</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group className="mb-3" controlId="withdrawContainer">
                  <Form.Label>Enter Amount:</Form.Label>
                  <div className="row">
                    <div className="col pe-0">
                      <Form.Control className="" onChange={processInput} type="text" />
                    </div>
                    <div className="col ps-0">
                      <ProceedAndToggle purpose="withdraw" eventKey="1">Withdraw</ProceedAndToggle>
                    </div>
                  </div>
                </Form.Group>
              </Form>
            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
      </div>
    </div>
  );
}

export default App;