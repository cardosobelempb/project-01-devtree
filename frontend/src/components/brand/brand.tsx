import BrabdImg from '@/assets/images/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

type BradProps = {
    link?: string
}

export const Brand: React.FC<BradProps> = ({ link }) => {
    return link ? (
        <Link
            href={`/${link}`}
            className="flex place-self-center"
        >
            <Image
                // layout="fill"
                // objectFit="cover"
                src={BrabdImg}
                alt=""
                priority
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
            />
        </Link>
    ) : (
        <Image
            // layout="fill"
            // objectFit="cover"
            src={BrabdImg}
            alt=""
            priority
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
        />
    )
}
