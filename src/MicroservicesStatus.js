/**
 * widget showing the microservices
 */
function MicroservicesStatus({answer}) {
  return answer && answer.order ? answer.order.map((n) => (<p><b>{n}</b>: {answer.microservices[n].map(o => o.id).join(",")}</p>)) : (<p/>);
}

export default MicroservicesStatus;
