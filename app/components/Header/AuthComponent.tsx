"use client";

import React, { useContext, useState } from "react";
import { AuthContext } from "@/app/contexts/authContext";
import auth from "@/app/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";

function Auth() {
  const { user } = useContext(AuthContext) ?? { user: null };

  const [logPopUp, setLogPopUp] = useState(false);
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [logSaveCreds, setLogSaveCreds] = useState(false);

  const [registerPopUp, setRegisterPopUp] = useState(false);
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regSaveCreds, setRegSaveCreds] = useState(false);

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-2 transition-all duration-500">
          <div
            onClick={() => {
              signOut(auth);
            }}
            className="cursor-pointer select-none rounded-xl border-[1px] border-gray-300 bg-white bg-opacity-100 p-1 px-2 text-sm text-black transition-all duration-300 hover:bg-opacity-75"
          >
            Déconnexion
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 transition-all duration-500">
            <Dialog>
              <DialogTrigger>
                <div
                  onClick={() => {
                    setLogPopUp(true);
                  }}
                  className="cursor-pointer select-none rounded-xl border-[1px] border-gray-700 bg-white bg-opacity-0 p-1 px-2 text-sm text-gray-400 transition-all duration-300 hover:bg-opacity-5 hover:text-gray-200"
                >
                  Connexion
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Se connecter</DialogTitle>
                  <DialogDescription>
                    Connectez-vous pour accéder à votre compte et passez un bon
                    moment!
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Email
                    </Label>
                    <Input
                      onChange={(event) => {
                        setLogEmail(event.currentTarget.value);
                      }}
                      id="email"
                      defaultValue=""
                      className="col-span-3"
                      type="email"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Mot de passe
                    </Label>
                    <Input
                      onChange={(event) => {
                        setLogPassword(event.currentTarget.value);
                      }}
                      id="password"
                      defaultValue=""
                      className="col-span-3"
                      type="password"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      signInWithEmailAndPassword(auth, logEmail, logPassword)
                        .then((userCredential) => {
                          if (userCredential) {
                            toast("Vous êtes maintenant connecté !");
                          }
                        })
                        .catch((error) => {
                          if (error.code === "auth/invalid-email") {
                            toast(
                              "Aucun compte n'est associé à cette adresse email !",
                            );
                          } else if (error.code === "auth/invalid-credential") {
                            toast("Vérifiez vos identifiants...");
                          }
                        });
                      setLogEmail("");
                      setLogPassword("");
                      setLogPopUp(false);
                    }}
                    type="submit"
                    variant={"outline"}
                  >
                    Se connecter
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>
                <div
                  onClick={() => {
                    setRegisterPopUp(true);
                  }}
                  className="cursor-pointer select-none rounded-xl border-[1px] border-gray-300 bg-white bg-opacity-100 p-1 px-2 text-sm text-black transition-all duration-300 hover:bg-opacity-75"
                >
                  Inscription
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Inscription</DialogTitle>
                  <DialogDescription>
                    Créez un compte pour accéder à toutes les fonctionnalités de
                    notre site !
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Email
                    </Label>
                    <Input
                      onChange={(event) => {
                        setRegEmail(event.currentTarget.value);
                      }}
                      id="email"
                      defaultValue=""
                      className="col-span-3"
                      type="email"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Mot de passe
                    </Label>
                    <Input
                      onChange={(event) => {
                        setRegPassword(event.currentTarget.value);
                      }}
                      id="password"
                      defaultValue=""
                      className="col-span-3"
                      type="password"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      createUserWithEmailAndPassword(
                        auth,
                        regEmail,
                        regPassword,
                      )
                        .then((userCredential) => {
                          if (userCredential) {
                            toast("Votre compte a bien été créé !");
                          }
                        })
                        .catch((error) => {
                          if (error.code === "auth/email-already-in-use") {
                            toast(
                              "Un compte est déjà associé à cette adresse email !",
                            );
                          } else if (error.code === "auth/invalid-email") {
                            toast("Vérifiez votre adresse email...");
                          }
                        });
                      setRegEmail("");
                      setRegPassword("");
                      setRegisterPopUp(false);
                    }}
                    type="submit"
                    variant={"outline"}
                  >
                    S'inscrire
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {logPopUp ? (
            // <div
            //   className="absolute inset-0 z-40 h-full w-full bg-black bg-opacity-40 bg-clip-padding"
            //   style={{ backdropFilter: "blur(2px)" }}
            // >
            //   <div className="absolute inset-1/4 z-50 h-3/6 w-3/6 rounded-xl border-[1px] border-gray-700 bg-transparent p-5">
            //     <div className="flex items-center justify-between">
            //       <h1 className="select-none text-xl text-gray-200">
            //         Connexion
            //       </h1>
            //       <div
            //         onClick={() => {
            //           setLogPopUp(false);
            //         }}
            //         className="cursor-pointer text-gray-200 transition-all duration-300 hover:text-white"
            //       >
            //         <svg
            //           xmlns="http://www.w3.org/2000/svg"
            //           viewBox="0 0 20 20"
            //           fill="currentColor"
            //           className="h-5 w-5"
            //         >
            //           <path
            //             fillRule="evenodd"
            //             d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
            //             clipRule="evenodd"
            //           />
            //         </svg>
            //       </div>
            //     </div>
            //     <div className="mt-5 flex flex-col gap-2 px-5">
            //       <input
            //         onChange={(event) => {
            //           setLogEmail(event.currentTarget.value);
            //         }}
            //         value={logEmail}
            //         className="rounded-xl border-[1px] border-gray-700 bg-white bg-opacity-0 p-2 text-gray-200 outline-none transition-all duration-300 hover:bg-opacity-5 focus:bg-opacity-5"
            //         type="email"
            //         placeholder="Email"
            //       />
            //       <input
            //         onChange={(event) => {
            //           setLogPassword(event.currentTarget.value);
            //         }}
            //         value={logPassword}
            //         className="rounded-xl border-[1px] border-gray-700 bg-white bg-opacity-0 p-2 text-gray-200 outline-none transition-all duration-300 hover:bg-opacity-5 focus:bg-opacity-5"
            //         type="password"
            //         placeholder="Mot de passe"
            //       />
            //       <div className="mb-4 flex items-center justify-between">
            //         <div className="flex items-center gap-2">
            //           <div className="flex items-center">
            //             <input
            //               onChange={() => {
            //                 setLogSaveCreds(!logSaveCreds);
            //               }}
            //               id="custom-checkbox"
            //               type="checkbox"
            //               className="peer hidden"
            //             />
            //             <label
            //               htmlFor="custom-checkbox"
            //               className="cursor-pointer rounded-md border-2 border-gray-300 bg-gray-200 p-[0.5px] peer-checked:border-gray-600 peer-checked:bg-gray-600"
            //             >
            //               <svg
            //                 xmlns="http://www.w3.org/2000/svg"
            //                 viewBox="0 0 20 20"
            //                 fill="currentColor"
            //                 className="h-5 w-5 text-gray-200"
            //               >
            //                 <path
            //                   fillRule="evenodd"
            //                   d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
            //                   clipRule="evenodd"
            //                 />
            //               </svg>
            //             </label>
            //             <label
            //               htmlFor="custom-checkbox"
            //               className="ms-2 select-none text-gray-400"
            //             >
            //               Se souvenir de moi
            //             </label>
            //           </div>
            //         </div>
            //         <p className="cursor-pointer select-none text-gray-400 transition-all duration-300 hover:text-gray-200">
            //           Mot de passe oublié ?
            //         </p>
            //       </div>
            //       <button
            //         onClick={() => {
            //           signInWithEmailAndPassword(auth, logEmail, logPassword)
            //             .then((userCredential) => {
            //               if (userCredential) {
            //                 toast("Vous êtes maintenant connecté !");
            //               }
            //             })
            //             .catch((error) => {
            //               if (error.code === "auth/invalid-email") {
            //                 toast(
            //                   "Aucun compte n'est associé à cette adresse email !",
            //                 );
            //               } else if (error.code === "auth/invalid-credential") {
            //                 toast("Vérifiez vos identifiants...");
            //               }
            //             });
            //           setLogEmail("");
            //           setLogPassword("");
            //           setLogPopUp(false);
            //         }}
            //         className="select-none rounded-xl border-[1px] border-gray-700 bg-white bg-opacity-0 p-2 text-gray-200 outline-none transition-all duration-300 hover:bg-opacity-5 focus:bg-opacity-5"
            //       >
            //         Connexion
            //       </button>
            //     </div>
            //   </div>
            // </div>
            <></>
          ) : (
            <></>
          )}
          {registerPopUp ? (
            // <div
            //   className="absolute inset-0 z-40 h-full w-full bg-black bg-opacity-40 bg-clip-padding"
            //   style={{ backdropFilter: "blur(2px)" }}
            // >
            //   <div className="absolute inset-1/4 z-50 h-3/6 w-3/6 rounded-xl border-[1px] border-gray-700 bg-transparent p-5">
            //     <div className="flex items-center justify-between">
            //       <h1 className="select-none text-xl text-gray-200">
            //         Inscription
            //       </h1>
            //       <div
            //         onClick={() => {
            //           setRegisterPopUp(false);
            //         }}
            //         className="cursor-pointer text-gray-200 transition-all duration-300 hover:text-white"
            //       >
            //         <svg
            //           xmlns="http://www.w3.org/2000/svg"
            //           viewBox="0 0 20 20"
            //           fill="currentColor"
            //           className="h-5 w-5"
            //         >
            //           <path
            //             fillRule="evenodd"
            //             d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
            //             clipRule="evenodd"
            //           />
            //         </svg>
            //       </div>
            //     </div>
            //     <div className="mt-5 flex flex-col gap-2 px-5">
            //       <input
            //         onChange={(event) => {
            //           setRegEmail(event.currentTarget.value);
            //         }}
            //         value={regEmail}
            //         className="rounded-xl border-[1px] border-gray-700 bg-white bg-opacity-0 p-2 text-gray-200 outline-none transition-all duration-300 hover:bg-opacity-5 focus:bg-opacity-5"
            //         type="email"
            //         placeholder="Email"
            //       />
            //       <input
            //         onChange={(event) => {
            //           setRegPassword(event.currentTarget.value);
            //         }}
            //         value={regPassword}
            //         className="rounded-xl border-[1px] border-gray-700 bg-white bg-opacity-0 p-2 text-gray-200 outline-none transition-all duration-300 hover:bg-opacity-5 focus:bg-opacity-5"
            //         type="password"
            //         placeholder="Mot de passe"
            //       />
            //       <div className="mb-4 flex items-center justify-between"></div>
            //       <button
            //         onClick={() => {
            //           createUserWithEmailAndPassword(
            //             auth,
            //             regEmail,
            //             regPassword,
            //           ).then((userCredential) => {
            //             if (userCredential) {
            //               toast.success("Votre compte a bien été créé !");
            //             }
            //           });
            //           setRegEmail("");
            //           setRegPassword("");
            //           setRegisterPopUp(false);
            //         }}
            //         className="select-none rounded-xl border-[1px] border-gray-700 bg-white bg-opacity-0 p-2 text-gray-200 outline-none transition-all duration-300 hover:bg-opacity-5 focus:bg-opacity-5"
            //       >
            //         Inscription
            //       </button>
            //     </div>
            //   </div>
            // </div>
            <></>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default Auth;
