<?php

// src/DataPersister

namespace App\DataPersister;

use App\Entity\Conversation;
use App\Entity\Message;
use App\Repository\ConversationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use Symfony\Component\Security\Core\Security;
/**
 *
 */
class MessageDataPersister implements ContextAwareDataPersisterInterface
{
    /**
     * @param Security
     */
    private $_security;

    /**
     * @var EntityManagerInterface
     */
    private $_entityManager;

    /**
     * @var ConversationRepository
     */
    private $conversationRepository;
    /**
     * @param Request
     */
    private $_request;

    public function __construct(
        EntityManagerInterface $entityManager,
        RequestStack $request,
        Security $security,
        ConversationRepository $conversationRepository
    ) {
        $this->_entityManager = $entityManager;
        $this->_request = $request->getCurrentRequest();
        $this->_security = $security;
        $this->conversationRepository = $conversationRepository;
    }


    /**
     * {@inheritdoc}
     */
    public function supports($data, array $context = []): bool
    {
        return $data instanceof Message;
    }

    /**
     * @param Message $data
     */
    public function persist($data, array $context = [])
    {



        // Set the user if it's a new message
        if ($this->_request->getMethod() === 'POST') {
            $userId = $data->setUser($this->_security->getUser());
            $content = $data->getContent();
            $message = new Message();
            $message->setContent($content);
            $message->setUser($userId);
            $message->setMine(true);
            $conversation = new Conversation();
            //$this->conversationRepository->();






        }

        $this->_entityManager->persist($data);
        $this->_entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function remove($data, array $context = [])
    {
        $this->_entityManager->remove($data);
        $this->_entityManager->flush();
    }
}