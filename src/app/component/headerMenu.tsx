'use client'

import Link from "next/link";
import {
  Bars3Icon,
  XMarkIcon,
  BuildingStorefrontIcon,
  IdentificationIcon,
  TruckIcon,
  ClipboardDocumentListIcon,
  ShoppingBagIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';

const salesMenu = [
  { name: "Customer", description: "Data Customer, Alamat dan toko", href: "#", icon: BuildingStorefrontIcon },
  { name: "Pembelian", description: "Data Pembelian Customer melalui Sales", href: "#", icon: ShoppingBagIcon },
  { name: "Pengiriman", description: "Data Pengiriman Produk kepada Customer", href: "#", icon: TruckIcon },
  { name: "Laporan", description: "Laporan Penjualan Sales", href: "#", icon: ClipboardDocumentListIcon },
];

const transactionMenu = [
  { name: "Pembelian", description: "Data Pembelian Customer seluruh Sales", href: "#", icon: ShoppingBagIcon },
  { name: "Pengiriman", description: "Data Pengiriman Produk kepada Customer seluruh Sales", href: "#", icon: TruckIcon },
  { name: "Laporan", description: "Laporan Penjualan seluruh Sales", href: "#", icon: ClipboardDocumentListIcon },
  { name: "Customer", description: "Data Customer, Alamat dan toko", href: "#", icon: BuildingStorefrontIcon },
  { name: "Sales", description: "Data Sales distributor", href: "#", icon: IdentificationIcon },
  { name: "Driver", description: "Data sopir distributor", href: "#", icon: IdentificationIcon },
  { name: "Armada", description: "Data kendaraan distributor", href: "#", icon: TruckIcon },
  { name: "Produk", description: "Data Produk distributor", href: "#", icon: GiftIcon },
];

const driverMenu = [
  { name: "Customer", description: "Data Customer, Alamat dan toko tujuan pengiriman", href: "#", icon: BuildingStorefrontIcon },
  { name: "Pengiriman", description: "Data Pengiriman Produk kepada Customer", href: "#", icon: TruckIcon },
];

const HeaderMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthPage, setIsAuthPage] = useState(true);

  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem('userLogin');
    router.push('/login');
  };
 
  useEffect(() => {
    const userLogin = localStorage.getItem('userLogin');
    if (!userLogin) {
      router.push('/login');
    } else {
      setIsLogin(true);
    }
  }, [router]);

  useEffect(() => {
    setIsAuthPage(pathname === '/login' || pathname === '/register');
  }, [pathname]);

  return (
    <>
      {!isAuthPage && (
        <header className="bg-white">
          <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5">
                <img
                  src="/icon-sosro.svg"
                  alt="Logo"
                  className="h-12 p-1 w-auto border-4 border-red-600 rounded-md"
                />
              </Link>
            </div>

            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
              <Link href="product" className="text-sm font-semibold text-gray-900">
                Produk
              </Link>

              <Popover className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                  Sales
                  <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                </PopoverButton>
                <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {salesMenu.map((item) => (
                      <Link key={item.name} href={item.href} className="group relative flex items-center gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                        <div>
                          <span className="block font-semibold text-gray-900">{item.name}</span>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </PopoverPanel>
              </Popover>

              <Popover className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                  Transaksi
                  <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                </PopoverButton>
                <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {transactionMenu.map((item) => (
                      <Link key={item.name} href={item.href} className="group relative flex items-center gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                        <div>
                          <span className="block font-semibold text-gray-900">{item.name}</span>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </PopoverPanel>
              </Popover>

              <Popover className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                  Pengiriman
                  <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                </PopoverButton>
                <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {driverMenu.map((item) => (
                      <Link key={item.name} href={item.href} className="group relative flex items-center gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                        <div>
                          <span className="block font-semibold text-gray-900">{item.name}</span>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </PopoverPanel>
              </Popover>

              <Link href="#" className="text-sm font-semibold text-gray-900">
                Tentang
              </Link>
            </PopoverGroup>

            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              {isLogin ? (
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-red-600 border-2 border-red-600 px-4 py-2 rounded-lg hover:bg-red-50 hover:border-red-700 transition-colors duration-300"
                >
                  Keluar
                </button>
              ) : (
                <Link
                  href="login"
                  className="text-sm font-semibold text-red-600 border-2 border-red-600 px-4 py-2 rounded-lg hover:bg-red-50 hover:border-red-700 transition-colors duration-300"
                >
                  Masuk
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu */}
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-10" />
            <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
              <div className="flex items-center justify-between">
                <Link href="#" className="-m-1.5 p-1.5">
                  <img src="/icon-sosro.svg" alt="Logo" className="h-8 w-auto" />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile Menu Links */}
              <Disclosure as="div" className="mt-6">
                <DisclosureButton className="flex items-center rounded-lg text-gray-700">
                  <Link href="product" className="block rounded-lg text-gray-900 font-semibold">
                    Produk
                  </Link>
                </DisclosureButton>
              </Disclosure>

              <Disclosure as="div" className="mt-4">
                <DisclosureButton className="-m-2.5 flex items-center rounded-lg p-2.5 text-gray-700">
                  <span className="text-base font-semibold text-gray-900">Sales</span>
                </DisclosureButton>
                <DisclosurePanel className="mt-2 space-y-2">
                  {salesMenu.map((item) => (
                    <Link key={item.name} href={item.href} className="block rounded-lg p-2 text-gray-900">
                      {item.name}
                    </Link>
                  ))}
                </DisclosurePanel>
              </Disclosure>

              <Disclosure as="div" className="mt-4">
                <DisclosureButton className="-m-2.5 flex items-center rounded-lg p-2.5 text-gray-700">
                  <span className="text-base font-semibold text-gray-900">Transaksi</span>
                </DisclosureButton>
                <DisclosurePanel className="mt-2 space-y-2">
                  {transactionMenu.map((item) => (
                    <Link key={item.name} href={item.href} className="block rounded-lg p-2 text-gray-900">
                      {item.name}
                    </Link>
                  ))}
                </DisclosurePanel>
              </Disclosure>

              <Disclosure as="div" className="mt-4">
                <DisclosureButton className="-m-2.5 flex items-center rounded-lg p-2.5 text-gray-700">
                  <span className="text-base font-semibold text-gray-900">Pengiriman</span>
                </DisclosureButton>
                <DisclosurePanel className="mt-2 space-y-2">
                  {driverMenu.map((item) => (
                    <Link key={item.name} href={item.href} className="block rounded-lg p-2 text-gray-900">
                      {item.name}
                    </Link>
                  ))}
                </DisclosurePanel>
              </Disclosure>

              <div className="mt-6 border-t pt-6">
                {isLogin ? (
                  <button
                    className="text-sm font-semibold text-red-600 border-2 border-red-600 px-4 py-2 rounded-lg hover:bg-red-50 hover:border-red-600 transition-colors duration-300"
                  >
                    Keluar
                  </button>
                ) : (
                  <Link
                    href="login"
                    className="text-sm font-semibold text-red-600 border-2 border-red-600 px-4 py-2 rounded-lg hover:bg-red-50 hover:border-red-600 transition-colors duration-300"
                  >
                    Masuk
                  </Link>
                )}

              </div>
            </DialogPanel>
          </Dialog>
        </header>
      )}
    </>
  );
};

export default HeaderMenu;