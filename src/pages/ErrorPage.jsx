import ErrorContent from "../components/Common/ErrorContent";

const ErrorPage = () => {
  return (
    <ErrorContent
      status={404}
      message={"The page you’re looking for was not found."}
    />
  );
};

export default ErrorPage;
