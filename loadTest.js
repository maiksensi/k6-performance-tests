import http from "k6/http"
import { check, sleep } from "k6"

// 1. init code
// run once per vu (virtual user)

export let options = {
  // ramp up, wramp down
  stages: [
    { duration: "15s", target: 5 },
    { duration: "30s", target: 5 },
    { duration: "15s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<250"],
  },
}

export function setup() {
  // 2. setup code
  // called once per test
}

export default function () {
  // 3. vu code; k6 will execute this default function in a loop for every VU
  // for the duration of the test run.
  // data can be passed via parameter from setup
  // The duration it takes for a VU to complete one loop, or iteration,
  // of this function is what we refer to as "VU iteration duration".
  let res = http.get("https://api.thecatapi.com/v1/images/search")
  check(res, { "status was 200": r => r.status == 200 })
  sleep(1)
}

export function teardown(data) {
  // 4. teardown code
  // called once per test
}

// why only those four lifecycle steps?
// why so restrictive in what gets passed?
// why is using modules so restricted?
// --> same script for local, cloud and clustered usage
