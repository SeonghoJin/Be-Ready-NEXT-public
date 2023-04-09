import { AxiosError } from "axios";
import { useToast } from "../components/Toast/util";
import { useEffect } from "react";
import { useRouter } from "next/router";

type HandleErrorCallback = (e: Pick<AxiosError, "response">) => boolean;

export const useHandleError = (
  e: null | Pick<AxiosError, "response">,
  reset: () => void,
  callbacks: HandleErrorCallback[] = []
) => {
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!e?.response?.status) {
      reset();
      return;
    }
    if (e?.response?.status === 403) {
      reset();
      toast({
        text: (
          <div>
            로그인이 필요한 서비스에요.
            <br /> 2초 뒤 로그인 페이지로 이동할게요. 👉
          </div>
        ),
        time: 2000,
        force: true,
        onToastEnd: () => {
          router.push("/login");
        }
      });
    } else {
      callbacks
        .map((callback) => callback(e))
        .every((result) => result === false)
        .valueOf() &&
      toast({
        text: "알 수 없는 에러가 발생했어요.😱 <br/>다시 시도해주세요.",
        time: 2000,
        force: true
      });
      reset();
    }
  }, [e?.response?.status]);
};
