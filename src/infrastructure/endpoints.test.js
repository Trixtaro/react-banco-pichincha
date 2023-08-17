import {
  fetchGetProducts,
  fetchSaveProducts,
  fetchDeleteProduct,
  fetchUpdateProduct,
  fetchValidateId,
} from "./endpoints";

const mockFetch = jest.spyOn(global, "fetch");

describe("endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetchGetProducts", async () => {
    mockFetch.mockImplementationOnce(() => ({
      status: 200,
      json: Promise.resolve({}),
    }));

    await fetchGetProducts();

    expect(mockFetch).toHaveBeenCalled();
  });

  it("fetchSaveProducts", async () => {
    mockFetch.mockImplementationOnce(() => ({
      status: 200,
      json: Promise.resolve({}),
    }));

    await fetchSaveProducts(
      "an id",
      "a name",
      "a description",
      "logo url",
      "2023-10-10",
      "2024-10-10"
    );

    expect(mockFetch).toHaveBeenCalled();
  });

  it("fetchUpdateProduct", async () => {
    mockFetch.mockImplementationOnce(() => ({
      status: 200,
      json: Promise.resolve({}),
    }));

    await fetchUpdateProduct(
      "an id",
      "a name",
      "a description",
      "logo url",
      "2023-10-10",
      "2024-10-10"
    );

    expect(mockFetch).toHaveBeenCalled();
  });

  it("fetchDeleteProduct", async () => {
    mockFetch.mockImplementationOnce(() => ({
      status: 200,
      json: Promise.resolve({}),
    }));

    await fetchDeleteProduct("an id");

    expect(mockFetch).toHaveBeenCalled();
  });

  it("fetchValidateId", async () => {
    mockFetch.mockImplementationOnce(() => ({
      status: 200,
      json: Promise.resolve({}),
    }));

    await fetchValidateId("an id");

    expect(mockFetch).toHaveBeenCalled();
  });
});
