import VirtualList from './VirtualList'; // Your reusable component

// 1. Sample data
const data = Array.from({ length: 1000 }, (_, i) => `Item #${i + 1}`);

// 2. App component
function VirtualizeImplement() {
  return (
    <div style={{ padding: 20 }}>
      <h2>My Virtual List</h2>
      
      <VirtualList
        data={data}                // 🔹 array of items
        itemHeight={30}            // 🔹 each row is 30px tall
        height={300}               // 🔹 list is 300px tall (shows ~10 items)
        renderItem={(item, index) => (  // 🔹 how to render each item
          <div style={{ paddingLeft: 10 }} key={index}>
            {item}
          </div>
        )}
      />
    </div>
  );
}

export default VirtualizeImplement;
