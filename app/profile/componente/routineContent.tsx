export default function RoutineContent({
  productList,
}: {
  productList: any[]
}) {
  return (
    <div className="flex flex-col gap-8">
      {productList.map((product) => (
        <div
          key={product.code}
          className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm"
        >
          <h2 className="text-2xl font-semibold text-gray-900">
            {product.product.product_name}
          </h2>

          <p className="text-gray-500 mt-2">
            {product.product.brands}
          </p>
        </div>
      ))}
    </div>
  )
}