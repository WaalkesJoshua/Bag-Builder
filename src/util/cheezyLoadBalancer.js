
const cheezyLoadBalancer = () => {
  const num = Math.floor(Math.random() * 100);
  if (num % 2 === 0) {
    return process.env.REACT_APP_NODE_PORT;
  }
    return process.env.REACT_APP_SPRING_BOOT_PORT;
}

module.exports = {
 cheezyLoadBalancer
}
