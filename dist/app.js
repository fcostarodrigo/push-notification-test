async function subscribe() {
  // https://github.com/web-push-libs/web-push/issues/558
  var applicationServerKey, serviceWorkerRegister, subscription;

  applicationServerKey = await fetch("applicationServerKey.txt").then(function (
    response
  ) {
    return response.text();
  });

  console.log(await Notification.requestPermission());

  serviceWorkerRegister = await navigator.serviceWorker.register("dist/sw.js");

  subscription = await serviceWorkerRegister.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey,
  });

  document.querySelector("#subscription").innerHTML = JSON.stringify(
    subscription,
    null,
    2
  );
}

document.querySelector("button").addEventListener("click", subscribe);
